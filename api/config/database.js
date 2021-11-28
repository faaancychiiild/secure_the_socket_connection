const mongoose = require('mongoose');
require('dotenv').config();

const connect = () => {
    mongoose.connect(process.env.URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB atlas is connected :)'))
    .catch(ex => console.log(ex.message));
}

module.exports = connect;