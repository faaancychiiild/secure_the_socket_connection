const express = require('express');
const router = express.Router();
const connect_to_db = require('../config/database');

connect_to_db();

/*
@handler functions are separated from the router file
*/
const RegisterHandler = require('./handlers/register');
const LoginHandler = require('./handlers/login');

router.post('/register', RegisterHandler);
router.post('/login', LoginHandler);

module.exports = router;