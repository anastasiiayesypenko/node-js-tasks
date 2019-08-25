const products = require('../../db/products/all-products');

const productsRoute = (req, res) => {
    if (req.url.includes('?ids')) {
        const ids = req.query.ids;
        const idList = ids.split(',');
        const bracketsPattern = /'|"/g;
        const clearList = idList.map(id => Number(id.replace(bracketsPattern, '')));
        const responseProducts = products.filter(product => clearList.includes(product.id));
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        if (responseProducts.length > 0) {
            res.send(JSON.stringify(responseProducts));
        } else {
            const result = {
                'status': 'no products',
                'products': []
            };
            res.send(result);
        }
    } else {
        res.send(products);
    }

};

module.exports = productsRoute;