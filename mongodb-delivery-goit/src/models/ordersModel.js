const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({

    "creator": {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    "productsList": Array,
    "deliveryType": String,
    "deliveryAdress": String,
    "sumToPay": Number,
    "status": String,

});

module.exports = mongoose.model('orders', ordersSchema);