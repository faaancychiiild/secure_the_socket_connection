const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: String,
    password: String,
    token: String

});

const User = mongoose.model('User', userSchema);

module.exports = User;