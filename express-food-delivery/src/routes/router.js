const express = require('express');
const mainRoute = require('./main/main');
const productsIdRoute = require('./products/productsId');
const productsRoute = require('./products/products');
const getUserRoute = require('./user/getUserRoute');
const postUserRoute = require('./user/postUserRoute');
const ordersRoute = require('./orders/orders');

const getSaveImageHandlers = require('./image/save-image-route');


const apiRoutes = express.Router();

apiRoutes
    .get('/', mainRoute)
    .get('/products/:id', productsIdRoute)
    .get('/products', productsRoute)
    .get('/users/:id', getUserRoute)
    .post('/users', postUserRoute)
    .post('/orders', ordersRoute)
    .post('/images', getSaveImageHandlers())
    .post('*', (req, res) => {
        res.redirect('/');
    })
    .get('*', (req, res) => {
        res.redirect('/');
    });

module.exports = apiRoutes;