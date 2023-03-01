const User = require("../models/User")

class UserController{

    static async getAllUsers(req,res){
        try {
            const arrayDataofUsers = await User.findAll()
            res.status(200).json(arrayDataofUsers)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getUserById(req,res){
        try {
            const {userId} = req.params
            const user = await User.findById(userId)
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports= UserController