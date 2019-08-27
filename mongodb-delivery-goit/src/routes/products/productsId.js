const products = require('../../db/products/all-products');

const productsIdRoute = (req, res) => {
    const productId = req.params.id;
    const productWithReqId = products.find((product) => product.id === Number(productId));
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    if (productWithReqId) {
        res.send(JSON.stringify(productWithReqId));
    } else {
        const result = {
            'status': 'no products',
            'products': []
        };
        res.send(result);
    }

};

module.exports = productsIdRoute;