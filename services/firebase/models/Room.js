const db = require("../configConnection/firebaseconnection");
const { hashPassword } = require("../helpers/bcrpyt");

class Room {
    static async findAll(category) {
        try {
            const rooms = await db.collection("rooms");
            const snapshot = await rooms.where("player2", "==", null).where("category", "==", +category).get();
            let responseArr = [];
            snapshot.forEach((doc) => {
                let objRoom = doc.data();
                objRoom.id = doc.id;
                responseArr.push(objRoom);
            });

            return responseArr;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const user = db.collection("rooms").doc(id);
            const doc = await user.get();
            if (!doc.data()) {
                throw { status: 404, message: "Data not found" };
            } else {
                const data = doc.data();
                data.id = doc.id;
                delete data.password;
                return data;
            }
        } catch (error) {
            throw error;
        }
    }
    static async create(payload) {
        try {
            return db.collection("rooms").add(payload);
        } catch (err) {
            throw err;
        }
    }

    static async update(id, payload) {
        try {
            const userRef = db.collection("rooms").doc(id);
            return userRef.update(payload);
        } catch (err) {
            throw err;
        }
    }

    static async delete(id) {
        try {
            await db.collection("rooms").doc(id).delete();
            return null;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Room;
