const User = require('../../config/models');
const bcrypt = require('bcrypt');

const LoginHandler = async (req, res) => {
    try {
        let {email, password} = req.body;
        let user = await User.findOne({email});
        bcrypt.compare(password, user.password, (err, resolve) => {
            if(err) res.status(403).json(err);
            if(resolve){
                user.logCount += 1;
                user.save();
                let refresh_token = require('./gen_tokens').refresh(user._id.str);
                let access_token = require('./gen_tokens').access(user._id.str);
                res.status(200).json({
                    refresh_token: user.token,
                    access_token,
                    logCount: user.logCount
                });
                return; 
            }
            res.status(403).json('credentials do not match');
        });
    } catch(ex){
        res.status(403).json(ex.message);
    }
}

module.exports = LoginHandler;