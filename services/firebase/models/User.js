const db = require("../configConnection/firebaseconnection")

class User{

    static async findAll(){
        try {
            const users = await db.collection("users")
            const snapshot = await users.get();
            let responseArr = []
            snapshot.forEach(doc => {
                let objUser = doc.data()
                objUser.id = doc.id
                responseArr.push(objUser)
              });
            return responseArr
        } catch (error) {
           throw error
        }
    }

    static async findById(id){
        try {
            const user = db.collection("users").doc(id)
            const doc = await user.get()
          
            if(!doc){
                throw({status:404,message:"Data not found"})
            }else {
                const data = doc.data()
                data.id = doc.id
                return data
            }
        } catch (error) {
            return error
        }
    }

}


module.exports = User