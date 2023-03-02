const express = require('express')
const CommentController = require('../controllers/commentController')
const commentRouter = express.Router()

commentRouter.post('/', CommentController.addComment)

module.exports = commentRouter