const main = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(`
    <!doctype html>
    <html>
    <body>
       <h1>Main<h1>
    </body>
    </html>
  `);
}
module.exports = main;