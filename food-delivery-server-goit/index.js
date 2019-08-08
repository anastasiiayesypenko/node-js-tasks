const startServer = require('./src/server');
const config = require('./config');

startServer(config.port);