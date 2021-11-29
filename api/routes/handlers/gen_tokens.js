const jwt = require('jsonwebtoken');
require('dotenv').config();

const refresh = (iss) => jwt.sign(
    {
        "iss": iss,
        "exp": JSON.parse(Date.now()) + 1000
    },
    process.env.REFRESH_TOKEN_KEY
);

const access = (iss) => jwt.sign(
    {
        "iss": iss,
        "exp": JSON.parse(Date.now()) + 15
    },
    process.env.ACCESS_TOKEN_KEY
);



module.exports = { refresh, access }