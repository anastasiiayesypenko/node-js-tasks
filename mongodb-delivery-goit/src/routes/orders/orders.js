const usersDB = require('../../db/users/all-users.json');
const products = require('../../db/products/all-products');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');

const orderRoute = (req, res) => {
    let body = '';
    req.on('data', function (data) {
            body += data;
        })
        .on('end', function () {
            const parsedBody = JSON.parse(body);
            const requestProductsIds = parsedBody.products;
            const userId = parsedBody.user;
            const {
                username
            } = usersDB.find(user => user.id === userId);
            const requestProducts = products.filter(product => requestProductsIds.includes(product.id));
            const orderId = uniqid();

            res.setHeader('Content-Type', 'application/json');
            res.status(200);

            if (requestProducts.length > 0) {
                const orderDirPath = path.join(__dirname, "..", "..", "db", "users", `${username}`, "orders");
                if (!fs.existsSync(orderDirPath)) {
                    fs.mkdirSync(orderDirPath, {
                        recursive: true
                    });
                }
                fs.appendFile(path.join(orderDirPath, `${orderId}.json`), body, function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
                parsedBody.id = orderId;
                const result = {
                    "status": "success",
                    "order": parsedBody
                }
                res.send(result);


            } else {
                const result = {
                    'status': 'failed',
                    'order': null
                };
                res.send(result);
            }

        });
}
module.exports = orderRoute;