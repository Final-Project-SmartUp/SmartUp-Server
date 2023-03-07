const db = require("../configConnection/firebaseconnection");

class Friend {

    static async addFriend(payload) {
        try {
            console.log(payload)
            return db.collection("friends").add(payload)
        } catch (err) {
            throw err
        }
    }
    static async findAll(userId) {
        try {

            const friends = await db.collection("friends")
            const snapshot = await friends.where("userId", "==", userId).where("isFriend", "==", true).get();

            let responseArr = []
            snapshot.forEach(doc => {
                let objFriend = doc.data()
                objFriend.id = doc.id
                responseArr.push(objFriend)
            });
            return responseArr
        } catch (error) {
            throw error
        }
    }
    static async invitationFriend(userId) {
        try {
            const friends = await db.collection("friends")
            const snapshot = await friends.where("userId", "==", userId).where("isFriend", "==", false).where("status", '==', true).get();

            let responseArr = []
            snapshot.forEach(doc => {
                let objFriend = doc.data()
                objFriend.id = doc.id
                responseArr.push(objFriend)
            });
            return responseArr
        } catch (error) {
            throw error
        }
    }
    static async requestFriend(userId) {
        try {
            const friends = await db.collection("friends")

            const snapshot = await friends.where("userId", "==", userId).where("isFriend", "==", false).where("status", '==', false).get();
            let responseArr = []
            snapshot.forEach(doc => {
                let objFriend = doc.data()
                objFriend.id = doc.id
                responseArr.push(objFriend)
            });
            return responseArr
        } catch (error) {
            throw error
        }
    }
    static async acceptFriend(id, payload) {
        try {
            const friends = await db.collection("friends").doc(id)
            return friends.update(payload);
        } catch (error) {
            throw error
        }
    }
    static async friendId(id) {
        try {
            const friend = db.collection("friends").doc(id)
            const doc = await friend.get()
            const data = doc.data()
            data.id = doc.id
            return data

        } catch (error) {
            throw error
        }
    }
    static async friendIdUpdate(userId, friendId) {
        try {
            const usersRef = db.collection('friends');
            const query = usersRef.where('userId', '==', friendId).where('friendId', '==', userId).where('isFriend', '==', false);
            const querySnapshot = await query.get();
            querySnapshot.forEach(doc => {

                console.log(doc);
                const docRef = usersRef.doc(doc.id);
                docRef.update({ isFriend: true, status: true });
            });

        } catch (error) {
            throw error
        }
    }
}

module.exports = Friend;