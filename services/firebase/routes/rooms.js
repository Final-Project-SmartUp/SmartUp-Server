const express = require('express')
const RoomController = require('../controllers/RoomController')
const router = express.Router()


router.get("/",RoomController.getAllRoomsPlayer2Empty)
router.post("/createRoom",RoomController.createRoom)
router.get("/:roomId",RoomController.getRoomById)
router.put("/:roomId",RoomController.joinRoom)
router.delete("/:roomId",RoomController.deleteRoom)



module.exports = router