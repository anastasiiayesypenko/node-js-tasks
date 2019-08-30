const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    currency: String,
    created: {
        type: Date,
        default: Date.now,
    },
    likes: Number,
    categories: Array,
});

module.exports = mongoose.model('products', productsSchema);