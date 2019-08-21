const main = (request, response) => {

  response.write(`
    <!doctype html>
    <html>
    <body>
       <h1>Main<h1>
    </body>
    </html>
  `);
  response.end();
}
module.exports = main;