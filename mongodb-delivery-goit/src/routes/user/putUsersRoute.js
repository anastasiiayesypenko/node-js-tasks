const UserModel = require('../../models/usersModel');

const putUsersRoute = (req, res) => {
    const id = req.params.id;
    // req.body = {"anyCriterionToChange": "newValue"}
    UserModel.updateOne({
            _id: id
        }, {
            $set: req.body
        })
        .exec()
        .then(() => {
            UserModel.findById({
                    _id: id
                })
                .exec()
                .then(result => res.send({
                    "status": "success",
                    "updatedUser": result
                }))
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err));
}
module.exports = putUsersRoute;