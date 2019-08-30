const mongoose = require('mongoose');
const OrdersModel = require('../../models/ordersModel');

const orderRoute = (req, res) => {
    let body = '';
    req.on('data', function (data) {
            body += data;
        })
        .on('end', function () {
            const requestBody = JSON.parse(body);
            const order = new OrdersModel({
                _id: new mongoose.Types.ObjectId,
                creator: requestBody.id,
                productsList: [...requestBody.productsList],
                deliveryType: requestBody.deliveryType,
                deliveryAdress: requestBody.deliveryAdress,
                sumToPay: requestBody.sumToPay,
                status: requestBody.status,
            });
            order.save()
                .then(() => res.send({
                    "status": "success"
                }))
                .catch(err => res.send(err));

        });
}
module.exports = orderRoute;