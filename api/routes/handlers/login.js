const User = require('../../config/models');
const bcrypt = require('bcrypt');

const LoginHandler = async (req, res) => {
    try {
        let {email, password} = req.body;
        let user = await User.findOne({email});
        bcrypt.compare(password, user.password, (err, resolve) => {
            if(err) res.status(403).json(err);
            if(resolve){
                res.status(200).json(resolve);
                return; 
            }
            res.status(403).json('credentials do not match');
        });
    } catch(ex){
        res.status(403).json(ex.message);
    }
}

module.exports = LoginHandler;