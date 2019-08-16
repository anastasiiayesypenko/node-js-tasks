const http = require('http');
const routes = require('./routes');
const url = require('url');

const startServer = (port) => {
    const server = http.createServer((req, res) => {
        const {
            pathname
        } = url.parse(req.url);
        const routing = routes[pathname] || routes.default;
        routing(req, res);
    })
    server.listen(port, () => {
        console.log('right!');
    })
};

module.exports = startServer;