const jwt = require('jsonwebtoken');
require('dotenv').config();

const VerifyToken = (req, res, next) => {
    let token = req.body['access_token'];
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if(err) throw new Error;
            console.log(data);
            next();
        });
    } catch(ex) {
        res.status(403).json(ex.message);
    }
}

module.exports = VerifyToken;