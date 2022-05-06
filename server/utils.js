import fs from "fs";

export default class Utils {
    static readData(file, filters) {
        let rawData = fs.readFileSync(`data/${file}.json`);
        let data = JSON.parse(rawData);
        let result = data;
        if (!!filters) {
            result = data.filter(item => {
                let matched = true;
                for (let key of Object.keys(filters)) {
                    matched = matched && filters[key] === item[key];
                }
                return matched;
            });
        }
        return result;
    };

    static updateData(file, data, key) {
        if (!key) key = "id";
        let allData = Utils.readData(file);
        for (let i in allData) {
            if (allData[i][key] === data[key]) {
                allData[i] = data;
                break;
            }
        }
        fs.writeFileSync(`data/${file}.json`, JSON.stringify(allData));
    };

    static getNewOrderId() {
        const users = Utils.readData("users");
        let orderId = 1;
        for (let user of users) {
            for (let order of user.orders) {
                if (order.id >= orderId) {
                    orderId = order.id + 1;
                }
            }
        }
        return orderId;
    }
}