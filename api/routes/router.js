const express = require('express');
const router = express.Router();
const argon = require('argon2');

router.post('/register', (req, res) => {
    let { username, email, password } = req.body;
    password = argon.hash(password);
    res.json(password);

});

module.exports = router;