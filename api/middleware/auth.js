const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../config/models');

const VerifyToken = async (req, res, next) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) {
        res.status(403).end();
        return;
    }

    let acc = await jwt.verify(req.body.token, process.env.ACCESS_TOKEN_KEY);
    
    if(!acc){
        //If access token is null, server will verify the refresh token
        let ref = jwt.verify(req.body.refresh, process.env.REFRESH_TOKEN_KEY);
        if(!ref){
            //If refresh token is also null, server will response with 403
            res.status(403).end();
        }
        //Else a new access token is generated and sent to the user
        let token = require('./gen_tokens').refresh(user._id.str);
        res.send(token);
    };
    if(acc.exp < Date.now()/1000){
        //Handles with expired access tokens
        let token = require('./gen_tokens').refresh(user._id.str);
        res.send(token);
    }
     next();
}

module.exports = VerifyToken;