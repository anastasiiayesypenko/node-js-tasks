const path = require('path');
const productsDB = require(path.join(__dirname, '..', '..', 'db', 'products', 'all-products.json'));

const products = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    response.write(JSON.stringify(productsDB));
}
module.exports = products;