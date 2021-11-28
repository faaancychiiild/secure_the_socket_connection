const User = require('../../config/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Observable } = require('rxjs');
const { observer } = require('./fetch_users');

const RegisterHandler = async (req, res) => {
    let {username, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            res.status(403).json('user already exists');
            return;
        }
        //bcrypt the password && store the hash to the database
        await bcrypt.genSalt(7, (err, salt) => {
            if(err) throw new Error;

            bcrypt.hash(password, salt, (err, hash) => {
                if(err) res.status(500).end();
                user = new User({
                    username, 
                    email,
                    password: hash
                });
                //assign json web token
                let refresh_token = require('./tokens').refresh(user._id.str);
                let access_token = require('./tokens').access(user._id.str);
                user.token = refresh_token;
                user.save();
                res.status(200).json({
                    refresh_token: user.token,
                    access_token
                });
            });
        });

        //Launch an observable to listen for registered users
        const observable = new Observable(subscriber => {
            subscriber.next('new user registered');
        });
        observable.subscribe(observer);
    }catch(ex){
        res.status(403).end();
    }
}

module.exports = RegisterHandler;