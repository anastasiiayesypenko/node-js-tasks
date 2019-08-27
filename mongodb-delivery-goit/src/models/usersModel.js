const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    telephone: String,
    password: String,
    email: Number,
});

module.exports = mongoose.model('User', userSchema);