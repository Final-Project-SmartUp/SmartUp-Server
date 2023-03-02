const express = require('express')
const PostController = require('../controllers/postController')
const postRouter = express.Router()

postRouter.get('/:categoryId', PostController.getAllPostByCategoryId)
postRouter.post('/', PostController.addPost)

module.exports = postRouter