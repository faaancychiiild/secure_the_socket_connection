const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: String,
    password: String,
    logCount: Number,
    token: String

});

const countUsersSchema = new mongoose.Schema({
    users: Number
});
const Count = mongoose.model('Count', countUsersSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, Count };