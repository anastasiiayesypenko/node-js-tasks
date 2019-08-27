const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    sku: Number,
    name: String,
    description: String,
    price: Number,
    currency: String,
    creatorId: Number,
    created: String,
    modified: String,
    categories: Array,
});

module.exports = mongoose.model('Products', productsSchema);