const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "smartUp_12";

module.exports = {
    encodeToken: (payload) => {
        return jwt.sign(payload, JWT_SECRET_KEY);
    },

    verifyToken: (access_token) => {
        return jwt.verify(access_token, JWT_SECRET_KEY);
    },
};
