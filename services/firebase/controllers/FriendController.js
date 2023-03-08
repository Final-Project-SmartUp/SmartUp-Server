const axios = require("axios");
const redis = require("../configConnection/redisConnection");
const Friend = require("../models/Friend");
const User = require('../models/User');


class FriendController {
    static async addFriend(req, res) {
        try {            
            const friendId = req.params.friendId;
            const userId = req.user.id
            const payload = {
                userId,
                friendId,
                status: true,
                isFriend: false
            };
            const payload2 = {
                userId: friendId,
                friendId: userId,
                status: false,
                isFriend: false
            };
            const newFriend = await Friend.addFriend(payload);
            const newFriend2 = await Friend.addFriend(payload2)
            res.status(201).json({
                payload,
                payload2
            });
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    static async getAllFriend(req, res) {
        try {
            console.log("masooook ke get")
            const userId = req.user.id;
            const friends = await Friend.findAll(userId);
            const user = await User.findAll();
            console.log(friends)
            const friend = friends.map(el => {
                const result = user.find(({ id }) => id === el.friendId)
                return { name: result.username, isFriend: el.isFriend, status: el.status, id: el.id }
            })
            res.status(200).json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async invitationFriend(req, res) {
        try {
            const userId = req.user.id
            const friends = await Friend.invitationFriend(userId);
            const user = await User.findAll()
            const friend = friends.map(el => {
                const result = user.find(({ id }) => id === el.friendId)
                // console.log(result, 'ini dia bro');
                if(!result) {
                    throw {status: 404, message: "Not Found"}
                }
                return { name: result.username, isFriend: el.isFriend, status: el.status, id: el.id }
            })
            // console.log("INI TEST")
            // console.log(friend)
            res.status(200).json(friend);
        } catch (error) {
            if(error.status) {
                res.status(error.status).json({message: error.message})
            }else {
                console.log(error)
                res.status(500).json(error);
            }
        }
    }

    static async requestFriend(req, res) {
        try {
            const userId = req.user.id

            const friends = await Friend.requestFriend(userId);
            const user = await User.findAll()
            const friend = friends.map(el => {
                const result = user.find(({ id }) => id === el.friendId)
                return { name: result.username, isFriend: el.isFriend, status: el.status, id: el.id }
            })
            console.log(friend)
            res.status(200).json(friend);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }

    static async acceptFriend(req,res){
        try {
            const id = req.params.id
            const data = await Friend.friendId(id)
            console.log(data, '<<<<<<<<<< ini DATA!!!!!')
             await Friend.acceptFriend(id,{
                    isFriend:true,
                    status:true
             })

             await Friend.friendIdUpdate(data.userId,data.friendId)

             res.status(200).json({message:'Add Friend Success!'})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    static async declineFriend(req,res){
        try {
            const id = req.params.id
            console.log(id)
            const data = await Friend.friendId(id)
            console.log(data,"ini declineee!!")
             await Friend.acceptFriend(id,{
                    isFriend:false,
                    status:true
             })

             await Friend.friendIdUpdate(data.userId,data.friendId)

             res.status(200).json({message:'Decline Friend Success!'})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}





module.exports = FriendController;