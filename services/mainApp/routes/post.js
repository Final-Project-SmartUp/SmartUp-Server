const express = require('express')
const PostController = require('../controllers/postController')
const postRouter = express.Router()

postRouter.get('/:categoryId', PostController.getAllPostByCategoryId)
postRouter.post('/', PostController.addPost)
postRouter.patch('/:postId', PostController.editPost)

module.exports = postRouter