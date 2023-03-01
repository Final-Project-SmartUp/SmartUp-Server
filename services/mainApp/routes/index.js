const express = require('express')
const categoryRouter = require('./category')
const questionRouter = require('./question')
const router = express.Router()

router.use('/questions', questionRouter)
router.use('/categories', categoryRouter)

module.exports = router