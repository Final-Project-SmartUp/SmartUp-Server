const express = require('express')
const CommentController = require('../controllers/commentController')
const authentication = require('../middlewares/auth')
const commentRouter = express.Router()



commentRouter.use(authentication)
commentRouter.post('/', CommentController.addComment)
commentRouter.put('/:commentId', CommentController.editComment)
commentRouter.delete('/:commentId', CommentController.deleteComment)

module.exports = commentRouter