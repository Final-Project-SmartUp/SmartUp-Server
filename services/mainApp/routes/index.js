const express = require('express')
const categoryRouter = require('./category')
const postRouter = require('./post')
const questionRouter = require('./question')
const router = express.Router()

router.use('/questions', questionRouter)
router.use('/categories', categoryRouter)
router.use('/posts', postRouter)

module.exports = router