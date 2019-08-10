const qs = require('querystring');
const fs = require('fs');
const path = require('path');

const DEFAULT_USER = JSON.stringify(require(path.join(__dirname, '..', '..', 'user.json')));


const user = (request, response) => {
    fs.appendFile(path.join(__dirname, '..', '..', 'db', 'users', `${DEFAULT_USER.username}.json`), DEFAULT_USER, function (error) {
        if (error) throw error;
    });
    const user = JSON.parse(DEFAULT_USER);
    const result = {
        "status": "success",
        user
    }
    response.end(JSON.stringify(result));
}
module.exports = user;