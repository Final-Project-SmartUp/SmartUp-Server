const express = require('express')
const CategoryController = require('../controllers/categoryController')
const categoryRouter = express.Router()

categoryRouter.get('/', CategoryController.getAllCategories)


module.exports = categoryRouter