const axios = require('axios')
const { verifyToken } = require("../helpers/jwt");
const authentication = async (request, response, next) => {
    try {
        // Check ada token ga
        const { access_token } = request.headers;
            // kalo g ada throw
            if (!access_token) {
                throw { status: 401, message: "Invalid token"}
            }
        // kalo ada verify jadiin payload
        const payload = verifyToken(access_token)
        // dari payload dapat user
        const user = await axios({
            method: 'GET',
            url: `http://localhost:3001/users/${payload.id}`,
        })
        // Check usernya ada ga
        if (!user) {
            // kalo ga ada throw
            throw { status: 401, message: "Invalid token"}
        }
        //  kalo ada simpan di request.user
        request.user = user
        next (err)
    } catch (err) {
        next (err)
    }
}

module.exports = authentication