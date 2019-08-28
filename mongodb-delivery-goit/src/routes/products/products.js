const ProductModel = require('../../models/productsModel');

const productsRoute = (req, res) => {


    if (req.url.includes('?ids')) {
        const ids = req.query.ids;
        const bracketsPattern = /'|"|\"/g;
        const emptyList = [];
        emptyList.push(ids);
        const idList = ids.includes(',') ? ids.split(',') : emptyList;
        const clearList = idList.map(id => id.replace(bracketsPattern, ''));
        ProductModel.find({
                _id: clearList,
            })
            .exec()
            .then(result => res.send(result))
            .catch(err => res.send(err));

    } else {
        ProductModel.find()
            .exec()
            .then(result => res.send(result))
            .catch(err => res.send(err));
    }

};

module.exports = productsRoute;