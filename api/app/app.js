const app = require('express')();
const cors = require('cors');
const router = require('../routes/router');
const parser = require('body-parser');

app.use(cors({
    origin: '*'
}));
app.use(parser.json());
app.use('/', router);

module.exports = app;