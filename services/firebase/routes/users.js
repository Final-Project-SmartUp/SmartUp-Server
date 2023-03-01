const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

router.get("/",UserController.getAllUsers)
router.get("/:userId",UserController.getUserById)
module.exports = router