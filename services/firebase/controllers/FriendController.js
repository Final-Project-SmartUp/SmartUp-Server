const Friend= require("../models/Friend");

class FriendController {
    static async addFriend(req, res) {
        try {
            const { userId, friendId } = req.body;
            const payload = {
                userId,
                friendId,
            };
            const newFriend = await Friend.addFriend(payload);
            console.log(newFriend)
            res.status(201).json({
                id: newFriend._path.segments[1],
                userId,
                friendId,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    static async getAllFriend(req, res) {
        try {
            const friends = await Friend.findAll();
            res.status(200).json(friends);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

//find Friend where req.user= userId




module.exports=FriendController;