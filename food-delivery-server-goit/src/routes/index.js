const main = require('./main/main');
const productsRoute = require('./products/products');
const signUpRoute = require('./signup/signup');

const router = {
    signUp: signUpRoute,
    products: productsRoute,
    default: main,
};
module.exports = router;