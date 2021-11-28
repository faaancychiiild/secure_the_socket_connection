const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../../config/models');

//Verify access to specific routes
const VerifyAccess = (req, res) => {
    let user = User.findOne({email: req.body.email});
    let acc = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_KEY);
    
    if(!acc){
        //If access token is null, server will verify the refresh token
        let ref = jwt.verify(req.body.refresh, process.env.REFRESH_TOKEN_KEY);
        if(!ref){
            //If refresh token is also null, server will response with 403
            res.status(403).end();
            return;
        }
        //Else a new access token is generated and sent to the user
        let token = require('./gen_tokens').refresh(user._id.str);
        res.status(200).json(token);
    };
    if(acc.exp < Date.now()/1000){
        //Handles with expired access tokens
        let token = require('./gen_tokens').refresh(user._id.str);
        res.status(200).json(token);
    }
    res.status(200).end();
}

module.exports = { VerifyAccess }