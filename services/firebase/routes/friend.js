const express = require('express')
const FriendController = require('../controllers/FriendController')
const router = express.Router()

router.get('/',FriendController.getAllFriend);
router.get('/invitationFriend',FriendController.invitationFriend)
router.get('/requestFriend',FriendController.requestFriend);
router.put('/acceptFriend/:id',FriendController.acceptFriend)
router.put('/decline/:id',FriendController.declineFriend)
router.post("/:friendId",FriendController.addFriend);


module.exports = router