const express = require('express')
const QuestionController = require('../controllers/questionController')
const authentication = require('../middlewares/auth')
const questionRouter = express.Router()


questionRouter.use(authentication)
questionRouter.get('/:categoryValue', QuestionController.getQuestionsByCategoryValue)

module.exports = questionRouter