const mongoose = require('mongoose');
const OrdersModel = require('../../models/ordersModel');

const getOrdersRoute = (req, res) => {
    const id = req.params.id;
    OrdersModel.findById({
            _id: id
        })
        .exec()
        .then(result => res.send({
            "status": "success",
            "order": result
        }))
        .catch(err => res.send(err))
};
module.exports = getOrdersRoute;