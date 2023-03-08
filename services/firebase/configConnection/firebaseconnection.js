const credentials = require("../smartuppart2-firebase-adminsdk-ky107-fd76489801.json")
const admin = require("firebase-admin")


admin.initializeApp({
    credential: admin.credential.cert(credentials),
})


const db = admin.firestore()

module.exports = db