const db = require("../configConnection/firebaseconnection");
const { hashPassword } = require("../helpers/bcrpyt");

class User{
    static async findAll(){
        try {
            const users = await db.collection("users")
            const snapshot = await users.get();
            let responseArr = []
            snapshot.forEach(doc => {
                let objUser = doc.data()
                objUser.id = doc.id
                delete objUser.password
                responseArr.push(objUser)
              });
            return responseArr
        } catch (error) {
           throw error
        }
    }

    static async findByEmail(email){
        try {
            const users = await db.collection("users")
            const snapshot = await users.where("email" , "==", email).get();
            let responseArr = []
            snapshot.forEach(doc => {
                let objUser = doc.data()
                objUser.id = doc.id 
                responseArr.push(objUser)
              });
            return responseArr[0]
        } catch (error) {
           throw error
        }
    }

    static async findById(id){
        try {
            const user = db.collection("users").doc(id)
            const doc = await user.get()
            if(!doc.data()){
                throw({status:404,message:"Data not found"})
            }else {
                const data = doc.data()
                data.id = doc.id
                delete data.password
                return data
            }
        } catch (error) {
            throw error
        }
    }
    static async create(payload){
        try {
             payload.password = hashPassword(payload.password)
             return db.collection("users").add(payload)
        } catch (err) {
            throw err
        }
    }
    static async findByUsername(username){
        try {
            const users = await db.collection("users")
            const snapshot = await users.where("username" , "==", username).get();
            let responseArr = []
            snapshot.forEach(doc => {
                let objUser = doc.data()
                objUser.id = doc.id
                responseArr.push(objUser)
                });
            return responseArr[0]
        } catch (error) {
              throw error
        }
    }
    static async update(id,payload){
        try {
            const userRef = db.collection("users").doc(id)
            return userRef.update(payload);
        } catch (err) {
            throw err
        }
    }
    
}


module.exports = User