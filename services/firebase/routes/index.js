const express = require('express')
const router = express.Router()
const userRoutes = require("./users")
const roomsRoutes = require("./rooms")

router.use("/users",userRoutes)
router.use("/rooms",roomsRoutes)

module.exports = router