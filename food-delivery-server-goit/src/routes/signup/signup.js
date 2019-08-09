const qs = require('querystring');
const fs = require('fs');
const path = require('path');

const DEFAULT_USER = require(path.join(__dirname, '..', '..', 'user.json'));


const user = (request, response) => {
    let body = request.body;

    fs.appendFile(path.join(__dirname, '..', '..', 'db', 'users', 'username.json'), JSON.stringify(DEFAULT_USER), function (error) {
        if (error) throw error;
    });
}
module.exports = user;