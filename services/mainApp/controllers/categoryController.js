const { Category } = require("../models");

class CategoryController {
    static async getAllCategories(request, response, next) {
        try {
            let categories = await Category.findAll();
            categories = categories.map((el) => {
                let object = {
                    id: el.id,
                    name: el.name,
                    value: el.value,
                };
                return object;
            });
            console.log(request.user, "INI PENTING");
            response.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    static async getCategoryById(request, response, next) {
        try {
            const { categoryId } = request.params;

            const category = await Category.findOne({
                where: {
                    id: categoryId,
                },
            });

            if (!category) {
                throw { status: 404, message: "Category not found" };
            }

            response.status(200).json({
                id: categoryId,
                name: category.name,
                value: category.value,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategoryController;
