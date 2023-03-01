const express = require('express')
const CategoryController = require('../controllers/categoryController')
const categoryRouter = express.Router()

categoryRouter.get('/', CategoryController.getAllCategories)
categoryRouter.get('/:categoryId', CategoryController.getCategoryById)


module.exports = categoryRouter