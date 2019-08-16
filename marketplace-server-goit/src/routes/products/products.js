const productsDB = require('../../db/products/all-products.json');

const products = (req, res) => {
    if (req.method === "GET") {
        const productIdUrl = /\/products\/\d+/i;
        if (req.url && req.url.match(productIdUrl)) {
            console.log(req.url);
            const productId = Number(req.url.match(/\d+/)[0]);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            const requestProduct = productsDB.find((product) => product.id === productId);
            if (requestProduct) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(requestProduct));
            } else {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('404 not found');
            }

        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(productsDB));
        }

    }
    res.end();
}
module.exports = products;