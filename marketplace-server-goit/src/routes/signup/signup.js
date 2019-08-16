const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const signup = (request, response) => {
    if (request.method === "POST") {
        let body = '';
        request.on('data', function (data) {
                body = body + data;
            })
            .on('end', function () {
                const post = qs.parse(body);
                const result = {
                    status: "success",
                    post
                };
                const filename = JSON.parse(body).username;
                const pathToUserFile = path.join(__dirname, "..", "..", "db", "users", `${filename}.json`);

                fs.appendFile(
                    pathToUserFile,
                    body,
                    function (error) {
                        if (error) {
                            console.log(error);
                        }
                    }
                );

                // response.writeHead(200, {
                //     'Content-Type': 'application/json'
                // });
                // response.write(JSON.stringify(result));
            })
    }
    response.end();


}

module.exports = signup;