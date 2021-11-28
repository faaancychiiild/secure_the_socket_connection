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
const { FetchUsers } = require('./handlers/fetch_users');
const { VerifyAccess } = require('./handlers/ver_tokens');

router.post('/register', RegisterHandler);
router.post('/login', LoginHandler);
router.get('/fetch/users', FetchUsers);
router.post('/verify_access_token', VerifyAccess);

module.exports = router;