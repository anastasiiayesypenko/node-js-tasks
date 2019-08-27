const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
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
            user.save().then(result => {
                console.log(result)
            }).catch(err => console.log(err));
            res.status(201).json({
                message: "Horosho vse",
                createdUser: user
            })



        })
};

module.exports = postUserRoute;