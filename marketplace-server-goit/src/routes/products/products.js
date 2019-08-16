const productsDB = require('../../db/products/all-products.json');

const products = (request, response) => {
    if (request.method === "GET") {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(productsDB));
    }
    response.end();
}
module.exports = products;