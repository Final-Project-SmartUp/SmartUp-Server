const credentials = require("../smartup-ba538-firebase-adminsdk-am8dw-17ff5b7f47.json")
const admin = require("firebase-admin")

admin.initializeApp({
    credential: admin.credential.cert(credentials),
})

const db = admin.firestore()



module.exports = db