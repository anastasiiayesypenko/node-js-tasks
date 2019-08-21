// const http = require('http');
// const routes = require('./routes');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const multer = require('multer');
const products = require('./db/products/all-products');
const usersDB = require('./db/users/all-users.json');
const getSaveImageHandlers = require('./routes/image/save-image-route');


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('main');
});
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const productWithReqId = products.find((product) => product.id === Number(productId));
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    if (productWithReqId) {
        res.send(JSON.stringify(productWithReqId));
    } else {
        const result = {
            'status': 'no products',
            'products': []
        };
        res.send(result);
    }

});
app.get('/products', (req, res) => {
    if (req.url.includes('?ids')) {
        const ids = req.query.ids;
        const idList = ids.split(',');
        const bracketsPattern = /'|"/g;
        const clearList = idList.map(id => Number(id.replace(bracketsPattern, '')));
        const responseProducts = products.filter(product => clearList.includes(product.id));
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        if (responseProducts.length > 0) {
            res.send(JSON.stringify(responseProducts));
        } else {
            const result = {
                'status': 'no products',
                'products': []
            };
            res.send(result);
        }
    } else {
        res.send(products);
    }

});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const requestUser = usersDB.find(user => user.id === userId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    if (requestUser) {
        res.send(JSON.stringify(requestUser));
    } else {
        const result = {
            'status': 'not found'
        };
        res.send(result);
    }

});

app.post('/users', (req, res) => {
    let body = '';
    req.on('data', function (data) {
            body = body + data;
        })
        .on('end', function () {
            const user = JSON.parse(body);
            user.id = uniqid();
            const {
                username
            } = user;
            const pathToDB = path.join(__dirname, "db", "users", `all-users.json`);
            const userDirPath = path.join(__dirname, "db", "users", `${username}`)
            fs.mkdir(userDirPath, (err) => {
                if (err) {
                    console.log(err);
                }
                fs.appendFile(path.join(userDirPath, `${username}.json`), body, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });


            if (!fs.existsSync(pathToDB)) {
                const allUsersList = [];
                allUsersList.push(user);
                fs.appendFile(pathToDB, JSON.stringify(allUsersList),
                    function (error) {
                        if (error) {
                            console.log(error);
                        }
                    });
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                const result = {
                    status: "success",
                    user,
                };
                res.send(result);
            } else {
                fs.readFile(pathToDB, 'utf8', (error, content) => {
                    if (error) {
                        console.log(error);
                    }
                    const parsedDBContent = JSON.parse(content);
                    parsedDBContent.push(user);
                    fs.writeFile(pathToDB, JSON.stringify(parsedDBContent), (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    const result = {
                        status: "success",
                        user,
                    };
                    res.send(result);

                });


            }

        });
});

app.post('/orders', (req, res) => {
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
                const orderDirPath = path.join(__dirname, "db", "users", `${username}`, "orders");
                if (!fs.existsSync(orderDirPath)) {
                    fs.mkdirSync(orderDirPath);
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
});

app.post('/images', getSaveImageHandlers())



app.post('*', (req, res) => {
    res.redirect('/');
})

app.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = app;