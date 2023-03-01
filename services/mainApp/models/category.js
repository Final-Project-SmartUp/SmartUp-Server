"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Category's name is required",
                    },
                    notNull: {
                        msg: "Category's name is required",
                    },
                },
            },
            value: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "Category",
        }
    );
    return Category;
};
