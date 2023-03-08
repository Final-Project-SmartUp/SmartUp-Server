const express = require('express')
const CategoryController = require('../controllers/categoryController')
const authentication = require('../middlewares/auth')
const categoryRouter = express.Router()

categoryRouter.use(authentication)
categoryRouter.get('/', CategoryController.getAllCategories)
categoryRouter.get('/:categoryId', CategoryController.getCategoryById)


module.exports = categoryRouter