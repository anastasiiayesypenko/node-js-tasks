const app = require('./src/server');
const {
    port
} = require('./src/config/port');

app.listen(port, () => {
    console.log('listen');
});