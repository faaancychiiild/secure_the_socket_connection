const app = require('express')();
const cors = require('cors');
const router = require('../routes/router');

app.use(cors());
app.use(router);

module.exports = app;