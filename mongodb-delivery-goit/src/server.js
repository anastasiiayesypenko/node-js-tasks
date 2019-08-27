const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/router');
const mongoose = require('mongoose');
const password = require('./global/globalVars');

const config = {
    useNewUrlParser: true,
};
const dbUrl = 'mongodb+srv://nastiyayesypenko:' + password + '@cluster0-kgmph.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(dbUrl, config);

app.use(express.json());
app.use(cors());
app.use('/', router);

module.exports = app;