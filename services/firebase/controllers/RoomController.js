const Room = require("../models/Room");

class RoomController {
    static async getAllRoomsPlayer2Empty(req, res) {
        try {
            const { categoryId } = req.params;
            const dataOfRooms = await Room.findAll(categoryId);
            res.status(200).json(dataOfRooms);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async getRoomById(req, res) {
        try {
            const { roomId } = req.params;
            const dataOfRoom = await Room.findById(roomId);
            res.status(200).json(dataOfRoom);
        } catch (err) {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
    static async createRoom(req, res) {
        try {
            const categoryId= req.body.categoryId
            const { userId } = req.params;
            const newRoom = await Room.create({
                player1: userId,
                player2: null,
                isEnded: false,
                scorePlayer1: 0,
                scorePlayer2: 0,
                category: categoryId
            });
            res.status(201).json({
                id: newRoom._path.segments[1],
                player1: userId,
                player2: null,
                isEnded: false,
                scorePlayer1: 0,
                scorePlayer2: 0,
                category: categoryId
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    static async joinRoom(req, res) {
        try {
            const { roomId } = req.params;
            const { userId } = req.body;

            const room = await Room.findById(roomId);
            const updatedRoom = await Room.update(roomId, {
                player2: userId,
            });
            res.status(200).json({ message: "Player 2 joined the room" });
        } catch (err) {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
    static async deleteRoom(req, res) {
        try {
            const { roomId } = req.params;
            await Room.delete(roomId);
            res.status(200).json({ message: "Success delete room" });
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = RoomController;
