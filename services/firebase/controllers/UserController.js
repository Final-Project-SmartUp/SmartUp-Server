const { comparePasswordBcrypt } = require("../helpers/bcrpyt")
const { signToken } = require("../helpers/jwt")
const User = require("../models/User")
const redis = require("../configConnection/redisConnection");
const axios = require("axios");
const midtransClient = require('midtrans-client');

class UserController {
    static async getAllUsers(req, res) {
        try {
            let cacheUser = await redis.get("users");
            console.log(cacheUser)
            if(cacheUser){
                return res.status(200).json(JSON.parse(cacheUser));
            }else{
                const arrayDataofUsers = await User.findAll()
                res.status(200).json(arrayDataofUsers)
                redis.set("users", JSON.stringify(arrayDataofUsers))
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getUserById(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findById(userId)
            if (!user) {
                throw { status: 404, message: "User not found" }
            }
            res.status(200).json(user)
        } catch (err) {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }
    static async registerUser(req, res) {
        try {
            const { username, email, password } = req.body
            if (!email) {
                throw { message: "Email are required" }
            }
            if (!password) {
                throw { message: "Password are required" }
            }
            if (!username) {
                throw { message: "Username are required" }
            }
            const emailChecked = await User.findByEmail(email)
            if (emailChecked) {
                throw { message: "Email already registered" }
            }

            const usernameChecked = await User.findByUsername(username)
            if (usernameChecked) {
                throw { message: "Username already registered" }
            }
            const newUser = await User.create({
                username,
                profileName: username,
                email,
                password,
                isPlaying: false,
                isFindMatch: false,
                mmr: 0,
            })
            await redis.del("users")
            res.status(201).json({
                id: newUser._path.segments[1],
                username,
                email,
            })
        } catch (err) {
            if (err.message === "Username already registered" || err.message === "Email already registered") {
                console.log(err)
                res.status(400).json({ message: err.message })
            } else if (err.message === "Email are required") {
                res.status(400).json({ message: err.message })
            } else if (err.message === "Password are required") {
                res.status(400).json({ message: err.message })
            } else if (err.message === "Username are required") {
                res.status(400).json({ message: err.message })
            } else {
                res.status(500).json(err)
            }
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

            res.status(200).json({ access_token, id: user.id, username: user.username })
        } catch (err) {
            if (err.message === "Email is required") {
                res.status(err.status).json({ message: err.message })
            } else if (err.message === "Password is required") {
                res.status(err.status).json({ message: err.message })
            } else if (err.message === "Invalid email/password") {
                res.status(err.status).json({ message: err.message })
            }
            else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }
    static async updateIsPlayingUser(req, res) {
        try {
            const { userId } = req.params

            const user = User.findById(userId)
            if (!user) {
                throw { message: "User not found" }
            }
            await User.update(userId, {
                isPlaying: true,
            })
            res.status(200).json({ message: "Succed update" })
        } catch (error) {
            console.log(error, "INI ERROR")
            if (error.message === "User not found") {
                res.status(404).json({ message: error.message })
            }
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async uploadImageUser(req, res) {
        try {
            console.log(req.user.id)
            const image = req.file.path
            const profileName = req.body.profileName
            console.log(profileName)
            const updateUser = await User.uploadImage(req.user.id, {
                image: image,
                profileName: profileName,
            })
            const user= await User.findById(req.user.id)
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async checkout(req,response){
        try {
            const userId=req.user.id
            // console.log(req.user)
            const user = User.findById(userId)
            const totalGem= req.body.totalGem;

            let gross_amount= totalGem*6000;
            let snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : 'SB-Mid-server-Eu_prUEDontUM8Xy5RcFUqd6'
            });
    
            let parameter = {
                "transaction_details": {
                    "order_id": "YOUR-ORDERID"+ Math.floor(100000 + Math.random()*9000000),
                    "gross_amount": gross_amount
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": user.email,
                }
            };
    
            const midtransToken= await snap.createTransaction(parameter)
            
            response.status(201).json(midtransToken)
    
        } catch (error) {
            console.log(error);
        }
      }

}

module.exports = UserController
