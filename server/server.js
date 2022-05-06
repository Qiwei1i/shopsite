import express from "express";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import Utils from "./utils.js";

const app = express();
app.use(sessions({
    secret: ".n.QMCJJ5YL$79u",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    resave: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static("public"));

// session object
let session;

/**
 * this global function is used to authenicate each api needs user login
 * @param {Request} request 
 * @returns user or false
 */
function authenicate(request) {
    session = request.session;
    console.log(session);
    if (!!session.login) {
        const [loginUser] = Utils.readData("users", {login: session.login});
        return loginUser;
    } else {
        const { authorization } = request.headers;
        if (!!authorization) {
            const basicAuth = authorization.split(" ");
            if (basicAuth.length > 1) {
                const b64Credentials = basicAuth[1].split(":");
                if (b64Credentials.length === 2) {
                    let userName = Buffer.from(b64Credentials[0], "base64").toString();
                    let password = Buffer.from(b64Credentials[1], "base64").toString();
                    const [loginUser] = Utils.readData("users", {login: userName, password: password});
                    return loginUser;
                }
            }
        }
    }

    return false;
};

app.post("/api/signin", (request, response) => {
    if (!!authenicate(request)) {
        const user = authenicate(request);
        session.login = user.login;
        response.json(user);
    } else {
        response.json({error: "Unauthorized"});
    }
});

app.post("/api/signout", (request, response) => {
    if (!!authenicate(request)) {
        const user = authenicate(request);
        delete session.login;
        response.json(user);
    } else {
        response.json({error: "Unauthorized"});
    }
});

app.get("/api/clothes", (request, response) => {
    response.json(Utils.readData("clothes"));
});

app.post("/api/cart/add", (request, response) => {
    const user = authenicate(request);
    if (!!user) {
        const clothes = request.body;
        let targetClothes;
        for (let item of user.cart) {
            if (item.clothes.id === clothes.id) {
                targetClothes = item;
                break;
            }
        }
        if (!!targetClothes) {
            targetClothes.count += 1;
        } else {
            user.cart.push({
                clothes: clothes,
                count: 1 
            });
        }
        Utils.updateData("users", user, "login");
        response.json(user);
    } else {
        response.json({error: "Unauthorized"});
    }
});

app.post("/api/cart/remove", (request, response) => {
    const user = authenicate(request);
    if (!!user) {
        const clothes = request.body;
        let targetClothesIndex = null;
        for (let i = 0; i < user.cart.length; i++) {
            console.log(user.cart[i].clothes.id, clothes.id, user.cart[i].clothes.id === clothes.id)
            if (user.cart[i].clothes.id === clothes.id) {
                targetClothesIndex = i;
                break;
            }
        }
        if (null != targetClothesIndex) {
            user.cart[targetClothesIndex].count -= 1;
            if (user.cart[targetClothesIndex].count === 0) {
                user.cart.splice(targetClothesIndex, 1);
            }
        }
        Utils.updateData("users", user, "login");
        response.json(user);
    } else {
        response.json({error: "Unauthorized"});
    }
});

app.post("/api/cart/checkout", (request, response) => {
    const user = authenicate(request);
    if (!!user && user.cart.length > 0) {
        let totalPrice = 0;
        for (let item of user.cart) {
            totalPrice += Number(item.clothes.price) * Number(item.count);
        }
        user.orders.push({
            id: Utils.getNewOrderId(),
            items: user.cart,
            totalPrice: totalPrice,
            createDate: new Date()
        });
        user.cart = [];
        Utils.updateData("users", user, "login");
        response.json(user);
    } else {
        response.json({error: "Unauthorized"});
    }
});

app.listen(5000, () => {
    console.log("server is running on port 5000.");
});