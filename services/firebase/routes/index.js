const express = require('express')
const router = express.Router()
const userRoutes = require("./users")
const roomsRoutes = require("./rooms")
const auth = require('../middlewares/auth')
const friendRouter = require('./friend')

router.use('/friends',friendRouter)
router.use("/users",userRoutes)
router.use(auth)
router.use("/rooms",roomsRoutes)

module.exports = router