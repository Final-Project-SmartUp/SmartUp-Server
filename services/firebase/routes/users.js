const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

router.get("/",UserController.getAllUsers)
router.post("/register",UserController.registerUser)
router.post("/login", UserController.loginUser)
router.get("/:userId",UserController.getUserById)
router.patch("/:userId",UserController.updateIsPlayingUser)
module.exports = router