const ProductModel = require('../../models/productsModel');

const putProductRoute = (req, res) => {
    const id = req.params.id;
    ProductModel.updateOne({
            _id: id
        }, {
            $set: req.body
        })
        .exec()
        .then(() => {
            ProductModel.findById({
                    _id: id
                })
                .exec()
                .then(result => {
                    res.send({
                        "status": "success",
                        "updatedProduct": result
                    })
                })
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err));
}
module.exports = putProductRoute;