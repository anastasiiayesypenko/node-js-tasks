const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const router = require('./routes');

const startServer = port => {
    const server = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url);
        console.log(parsedUrl.pathname);
        // response.writeHead(200, {
        //     'Content-Type': 'text/html'
        // });
        // const routing = router[parsedUrl.pathname] || router.default;
        if (request.url.includes('products')) {
            response.write('products');
        }
        console.log(router[parsedUrl.pathname]);
        return response.end();
    });
    server.listen(port);
};

module.exports = startServer;