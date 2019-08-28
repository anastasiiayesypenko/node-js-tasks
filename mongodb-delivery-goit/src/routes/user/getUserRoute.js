const UserModel = require('../../models/usersModel');

const getUserRoute = (req, res) => {
    const userId = req.params.id;
    UserModel.findById({
        _id: userId
    }).exec().then(result => {
        res.status(200);
        res.send(result);

    }).catch(err => {
        console.log(err);
        res.send(err);
    });

}

module.exports = getUserRoute;