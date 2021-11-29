const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../config/models');

const VerifyToken = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(403).end();
        return;
    }

    let acc = await jwt.verify(req.body.token, process.env.ACCESS_TOKEN_KEY);

    if (!acc) {
        //If access token is null, server will verify the refresh token
        let ref = jwt.verify(req.body.refresh, process.env.REFRESH_TOKEN_KEY);
        if (!ref) {
            //If refresh token is also null, server will response with 403
            res.status(403).end();
            return;
        }
        //Else a new access token is generated and request body is modified
        let token = require('../routes/handlers/gen_tokens').access(user._id.str);
        req.body.token = token;
    };
    if (acc.exp < Date.now() / 1000) {
        //Handles with expired access tokens
        let token = require('./gen_tokens').access(user._id.str);
        req.body.token = token;
    }

    next();
}

module.exports = VerifyToken;