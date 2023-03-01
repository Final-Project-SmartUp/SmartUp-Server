const express = require('express')
const QuestionController = require('../controllers/questionController')
const questionRouter = express.Router()


questionRouter.get('/:categoryValue', QuestionController.getQuestionsByCategoryValue)

module.exports = questionRouter