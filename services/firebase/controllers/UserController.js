const { comparePasswordBcrypt } = require("../helpers/bcrpyt")
const { signToken } = require("../helpers/jwt")
const User = require("../models/User")

class UserController {
    static async getAllUsers(req, res) {
        try {
            const arrayDataofUsers = await User.findAll()
            res.status(200).json(arrayDataofUsers)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getUserById(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findById(userId)
            res.status(200).json(user)
        } catch (err) {
            if(err.status){
                res.status(err.status).json({message:err.message})
            }else{
                res.status(500).json({message:"Internal server error"})
            }
        }
    }
    static async registerUser(req, res) {
        try {
            const { username, email, password } = req.body
            const newUser = await User.create({
                username,
                profileName: username,
                email,
                password,
                online: false,
                isPlaying: false,
            })

            res.status(201).json({
                id: newUser._path.segments[1],
                username,
                email,
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { status: 400, message: "Email is required" }
            } else if (!password) {
                throw { status: 400, message: "Password is required" }
            }
            const user = await User.findByEmail(email)
            if (!user) {
                throw { status: 401, message: "Invalid email/password" }
            }
            const comparedPassword = comparePasswordBcrypt(
                password,
                user.password
            )
            if (!comparedPassword) {
                throw { status: 401, message: "Invalid email/password" }
            }
            const access_token = signToken({
                id: user.id,
                email: user.email,
            })
            await User.update(user.id, {
                online: true,
            })
            res.status(200).json({ access_token, id:user.id, username:user.username })
        } catch (err) {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async updateIsPlayingUser(req, res) {
        try {
            const { userId } = req.params

            const user = User.findById(userId)
            if(!user){
                
            }
            await User.update(userId, {
                isPlaying: true,
            })
            res.status(200).json({ message: "Succed update" })
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server error"})
        }
    }
}

module.exports = UserController
