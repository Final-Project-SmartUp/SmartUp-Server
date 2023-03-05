const express = require('express')
const FriendController = require('../controllers/FriendController')
const router = express.Router()


router.post("/",FriendController.addFriend)


module.exports = router