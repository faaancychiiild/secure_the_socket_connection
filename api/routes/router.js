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
const { FetchStats } = require('./handlers/get_stats');

router.post('/register', RegisterHandler);
router.post('/login', LoginHandler);
router.post('/fetch_page_stats', auth, FetchStats);

module.exports = router;