const User = require('../../config/models');
const bcrypt = require('bcrypt');

const RegisterHandler = async (req, res) => {
    let {username, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            res.status(403).json('user already exists');
            return;
        }
        await bcrypt.genSalt(7, (err, salt) => {
            if(err) throw new Error;

            bcrypt.hash(password, salt, (err, hash) => {
                user = new User({
                    username, 
                    email,
                    password: hash
                });
                user.save();
            });
        }); 
        res.status(200).json('user registered successfully');
    }catch(ex){
        res.status(403).end();
    }
}

module.exports = RegisterHandler;