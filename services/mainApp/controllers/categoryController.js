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
            response.status(200).json(categories);
        } catch (err) {
            response.status(500).json(err);
        }
    }
}

module.exports = CategoryController;
