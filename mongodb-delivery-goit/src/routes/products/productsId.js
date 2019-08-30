const ProductModel = require('../../models/productsModel');

const productsIdRoute = (req, res) => {
    const productId = req.params.id;
    ProductModel.findById({
            _id: productId
        })
        .exec()
        .then(result => res.send(result))
        .catch(err => res.send(err));

};

module.exports = productsIdRoute;