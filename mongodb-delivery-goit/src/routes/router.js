const express = require('express');
const mainRoute = require('./main/main');
const productsIdRoute = require('./products/productsId');
const productsRoute = require('./products/products');
const getUserRoute = require('./user/getUserRoute');
const postUserRoute = require('./user/postUserRoute');
const postOrdersRoute = require('./orders/postOrdersRoute');
const putUserRoute = require('./user/putUsersRoute');
const getOrderRoute = require('./orders/getOrdersRoute');
const putProductsRoute = require('./products/putProductsRoute');


const apiRoutes = express.Router();

apiRoutes
    .get('/', mainRoute)
    .get('/products/:id', productsIdRoute)
    .get('/products', productsRoute)
    .put('./products/:id', putProductsRoute)
    .get('/users/:id', getUserRoute)
    .post('/users', postUserRoute)
    .put('/users/:id', putUserRoute)
    .post('/orders', postOrdersRoute)
    .get('/orders/:id', getOrderRoute)
    .post('*', (req, res) => {
        res.redirect('/');
    })

    .get('*', (req, res) => {
        res.redirect('/');
    });

module.exports = apiRoutes;