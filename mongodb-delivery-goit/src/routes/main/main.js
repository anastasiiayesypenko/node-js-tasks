const mainRoute = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('main');
}


module.exports = mainRoute;