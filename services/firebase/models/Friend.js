const db = require("../configConnection/firebaseconnection");

class Friend{
    static async addFriend(payload){
        try {
            console.log(payload)
            return db.collection("friends").add(payload)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    static async findAll(){
        try {
            const friends = await db.collection("friends")
            const snapshot = await friends.get();
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
}

module.exports = Friend;