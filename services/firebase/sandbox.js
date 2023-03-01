const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))




let counter = 0
docRef.onSnapshot(async (doc) => {
    console.log(doc)
    doc.docs.forEach((e) => {
        console.log(e.data());
    })
        // const usersRef = db.collection("users").doc("zO8G86OSHENxtkFoROGm")
        // let response =  await usersRef.get()
        // let responseArr = [];
        // // response.forEach(doc=>{
        // //     responseArr.push(doc.data())
        // // })
        // console.log(response.data())
    // if(data.firstName === "willy32"){
    //     console.log("masokkkkkkkkk 32")
    //     const userJson = {
    //         email: "wely@mail.com",
    //         firstName: "wely",
    //         lastName: "woly",
    //     }
    //     const response =  db.collection("users").add(userJson)

    // }else{
    //     console.log("gak masok")
    // }
   
  });


// app.get("/read/all", async (req, res) => {
//     try {
//         const doc = db.collection("users").doc("willy@mail.com")

        
//         res.status(200).json(docSnapshot)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

app.get("/read/:id", async (req, res) => {
    try {
        const usersRef = db.collection("users").doc(req.params.id)
        const response = await usersRef.get()
        res.status(200).json(response.data())
    } catch (err) {
        res.status(500).json(err)
    }
})

app.patch("/update", async (req, res) => {
    try {
        const id = req.body.id
        const newFirstName = "Hellow World!"
        const userRef = await db.collection("users").doc(id).update({
            firstName: newFirstName,
        })
        res.status(201).json(userRef)
    } catch {}
})


// const port = 8000

// app.listen(port, () => {
//     console.log("nyala")
// })
