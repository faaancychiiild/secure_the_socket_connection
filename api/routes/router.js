const express = require('express');
const router = express.Router();
const argon = require('argon2');
const connect_to_db = require('../config/database');
const User = require('../config/models');

connect_to_db();

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            res.json('user already exists');
        }
        user = await new User({
            username, 
            email,
            password
        });
        user.save();
        res.json('user registered successfully');
    } catch(ex){
        console.error(ex);
    }

});

module.exports = router;