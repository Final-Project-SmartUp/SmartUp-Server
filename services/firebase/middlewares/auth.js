
const { decodeToken } = require("../helpers/jwt");
const User  = require("../models/User");

const authentication = async (req, response, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        message: "Invalid token",
      };
    }

    const data = decodeToken(access_token);
    const user = await User.findById(data.id);

    if (!user) {
      throw {
        message: "Invalid token",
      };
    }

    req.user = user;
  
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      response.status(401).json({ message: "Invalid token" });
    } else {
      response.status(401).json(err)
    }
  }
};






module.exports = authentication;
