const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');

const postUserRoute = (req, res) => {
    let body = '';
    req.on('data', function (data) {
            body = body + data;
        })
        .on('end', function () {
            const user = JSON.parse(body);
            user.id = uniqid();
            const {
                username
            } = user;
            const pathToDB = path.join(__dirname, "..", "..", "db", "users", `all-users.json`);
            const userDirPath = path.join(__dirname, "..", "..", "db", "users", `${username}`)
            fs.mkdir(userDirPath, (err) => {
                if (err) {
                    console.log(err);
                }
                fs.appendFile(path.join(userDirPath, `${username}.json`), body, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });


            if (!fs.existsSync(pathToDB)) {
                const allUsersList = [];
                allUsersList.push(user);
                fs.appendFile(pathToDB, JSON.stringify(allUsersList),
                    function (error) {
                        if (error) {
                            console.log(error);
                        }
                    });
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                const result = {
                    status: "success",
                    user,
                };
                res.send(result);
            } else {
                fs.readFile(pathToDB, 'utf8', (error, content) => {
                    if (error) {
                        console.log(error);
                    }
                    const parsedDBContent = JSON.parse(content);
                    parsedDBContent.push(user);
                    fs.writeFile(pathToDB, JSON.stringify(parsedDBContent), (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    const result = {
                        status: "success",
                        user,
                    };
                    res.send(result);

                });


            }

        });
};

module.exports = postUserRoute;