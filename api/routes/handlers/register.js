const { User, Count } = require('../../config/models');
const bcrypt = require('bcrypt');
const { Observable } = require('rxjs');
const { observer } = require('./get_stats');

const countHandler = () => {
    Count.findOne({}, (err, doc) => {
        if (doc === null) {
            new Count({ users: 1 }).save();
            return;
        }
        doc.users += 1;
        doc.save();
    });
}

const RegisterHandler = async (req, res) => {
    let { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(403).json('user already exists');
            return;
        }
        //bcrypt the password && store the hash to the database
        await bcrypt.genSalt(7, (err, salt) => {
            if (err) throw new Error;

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) res.status(500).end();
                user = new User({
                    username,
                    email,
                    logCount: 1,
                    password: hash
                });
                countHandler();
                //assign json web token
                let refresh_token = await require('./gen_tokens').refresh(user._id.str);
                let access_token = await require('./gen_tokens').access(user._id.str);
                user.token = refresh_token;
                user.save();

                res.status(200).json({
                    refresh_token: user.token,
                    access_token,
                    logCount: user.logCount
                });
            });
        });
        /*Launch an observable to listen for registered users 
        *RxJS ლოგიკა ამ პროექტში გართულებულია 
        *მხოლოდ სადემონსტრაციოდ, რომ
        * 1) შეგვიძლია Observer I-ში გამოვაცხადოთ ახალი Observable, 
        * რომელსაც დავუკავშირებთ Observer II-ს
        * 2) Observer-Observable წყვილები შეგვიძლია გვქონდეს
        * სხვადასხვა მოდულებშიც
        */
        new Observable(subscriber => {
            subscriber.next('new user registered');
        }).subscribe(observer);
    } catch (ex) {
        res.status(403).end();
    }
}

module.exports = RegisterHandler;