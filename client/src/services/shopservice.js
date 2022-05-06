import base64 from "react-native-base64";

export default class ShopService {
    /**
     * get headers with basic authorization
     * @param String username 
     * @param String password 
     * @returns headers object
     */
    static getHeaders(username, password) {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Credentials: "same-origin"
        };
        if (!!username && !!password) {
            headers.Authorization = `Basic ${base64.encode(username)}:${base64.encode(password)}`;
        }
        return headers;
    };

    /**
     * login by username and password, username and password can be null in case of session.login exists
     * @param String username optional 
     * @param String password optional
     * @returns Promise user object
     */
     static signin(username, password) {
        return new Promise(resolve => {
            fetch("/api/signin", {method: "POST", headers: ShopService.getHeaders(username, password)})
            .then((res) => res.json())
            .then((user) => {
                resolve(user);
            });
        });
    };

    /**
     * logout
     * @param String username optional
     * @param String password optional
     * @returns Promise user object
     */
    static signout(username, password) {
        return new Promise(resolve => {
            fetch("/api/signout", {method: "POST", headers: ShopService.getHeaders(username, password)})
            .then((res) => res.json())
            .then((user) => {
                resolve(user);
            });
        })
    };

    /**
     * get clothes by filters
     * @param {any} filters array of filter object
     * logic: [filter1 or filter2 or ...] all filter items use 'or' logic
     * items in each filter item use 'and' logic
     * @returns Promise clothes object array
     */
    static getClothes(filters) {
        return new Promise(resolve => {
            fetch("/api/clothes", {method: "GET", headers: ShopService.getHeaders()})
            .then((res) => res.json())
            .then((clothes) => {
                let result = !!filters ? clothes.filter(item => {
                    let matched = true;
                    for (let i = 0; i < filters.length; i++) {
                        matched = true;
                        for (let key of Object.keys(filters[i])) {
                            let itemMatched = filters[i][key] === item[key];
                            if (Array.isArray(item[key]) || typeof item[key] === "string" 
                                || item[key] instanceof String) {
                                itemMatched = item[key].includes(filters[i][key]);
                            }
                            matched = matched && itemMatched;
                        }
                        if (matched) break;
                    }
                    return matched;
                }) : clothes;
                resolve(result);
            });
        });
    };

    /**
     * add clothes to cart
     * @param {any} clothes clothes object
     * @returns Promise user object
     */
    static addToCart(clothes) {
        return new Promise(resolve => {
            fetch("/api/cart/add", {method: "POST", headers: ShopService.getHeaders(), 
                body: JSON.stringify(clothes)})
            .then((res) => res.json())
            .then((user) => {
                resolve(user);
            });
        });
    };

    /**
     * remove clothes from cart
     * @param {any} clothes clothes object
     * @returns Promise user object
     */
    static removeFromCart(clothes) {
        return new Promise(resolve => {
            fetch("/api/cart/remove", {method: "POST", headers: ShopService.getHeaders(), 
                body: JSON.stringify(clothes)})
            .then((res) => res.json())
            .then((user) => {
                resolve(user);
            });
        });
    };

    /**
     * create order with cart items
     * @returns Promise user object
     */
    static checkoutCart() {
        return new Promise(resolve => {
            fetch("/api/cart/checkout", {method: "POST", headers: ShopService.getHeaders()})
            .then((res) => res.json())
            .then((user) => {
                resolve(user);
            })
        })
    }
}