const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const UserController = require('../controllers/UserController')
const router = express.Router()
const cloudinary = require('cloudinary').v2;
const auth = require('../middlewares/auth')
cloudinary.config({
    cloud_name: 'di6zlbiqd',
    api_key: '688896985545683',
    api_secret: 'X2yiS4IFVahzMicucYiEyYk6n94',
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'smartup',
    },
  });
  const upload = multer({ storage: storage });


router.get("/",UserController.getAllUsers)
router.post("/register",UserController.registerUser)
router.put('/addImage',auth, upload.single('image'), UserController.uploadImageUser);
router.post("/login", UserController.loginUser)
router.get("/:userId",UserController.getUserById)
router.patch("/:userId",UserController.updateIsPlayingUser)

module.exports = router