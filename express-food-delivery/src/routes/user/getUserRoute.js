const usersDB = require('../../db/users/all-users.json');

const getUserRoute = (req, res) => {
    const userId = req.params.id;
    const requestUser = usersDB.find(user => user.id === userId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    if (requestUser) {
        res.send(JSON.stringify(requestUser));
    } else {
        const result = {
            'status': 'not found'
        };
        res.send(result);
    }

}

module.exports = getUserRoute;