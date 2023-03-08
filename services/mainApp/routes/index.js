const express = require('express')
const categoryRouter = require('./category')
const commentRouter = require('./comment')
const postRouter = require('./post')
const questionRouter = require('./question')
const router = express.Router()

router.use('/questions', questionRouter)
router.use('/categories', categoryRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)

module.exports = router