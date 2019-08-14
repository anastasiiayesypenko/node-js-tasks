const http = require('http');
const router = require('./routes');


const startServer = port => {
    const server = http.createServer((request, response) => {
        if (request.url.includes('/products') && request.method === 'GET') {
            router.products(request, response);
        } else if (request.url.includes('/signup') && request.method === 'POST') {
            router.signUp(request, response);
        } else {
            router.default(request, response);
        }
        return response.end();
    });
    server.listen(port);
};

module.exports = startServer;