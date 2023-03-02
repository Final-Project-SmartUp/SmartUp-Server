const express = require('express')
const CommentController = require('../controllers/commentController')
const commentRouter = express.Router()

commentRouter.post('/', CommentController.addComment)
commentRouter.put('/:commentId', CommentController.editComment)


module.exports = commentRouter