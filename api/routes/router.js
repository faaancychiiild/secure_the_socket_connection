const express = require('express');
const router = express.Router();
const connect_to_db = require('../config/database');
const auth = require('../middleware/auth');

connect_to_db();

/*
@handler functions are separated from the router file
*/
const RegisterHandler = require('./handlers/register');
const LoginHandler = require('./handlers/login');
const FetchUsers = require('./handlers/fetch_users');

router.post('/register', RegisterHandler);
router.post('/login', LoginHandler);
router.get('/fetch/users', FetchUsers);

module.exports = router;