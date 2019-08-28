const mongoose = require('mongoose');
const UserModel = require('../../models/usersModel');

const postUserRoute = (req, res) => {

    let body = '';
    req.on('data', function (data) {
            body = body + data;
        })
        .on('end', function () {
            const requestBody = JSON.parse(body);
            const user = new UserModel({
                _id: new mongoose.Types.ObjectId,
                username: requestBody.username,
                telephone: requestBody.telephone,
                password: requestBody.password,
                email: requestBody.email,
            })
            user.save((err) => {
                if (err) throw err;
                console.log('user saved');
            });
            res.status(201).json({
                message: "Success! User was added to db",
                createdUser: user
            })
        })
};

module.exports = postUserRoute;