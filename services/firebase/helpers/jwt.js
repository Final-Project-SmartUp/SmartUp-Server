const jwt = require("jsonwebtoken")

function signToken(payload){
    return jwt.sign(payload,"smartUp_12")
}


module.exports = {signToken}