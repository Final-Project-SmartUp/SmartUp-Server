"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.Category, { foreignKey: "CategoryId" });
            Post.hasMany(models.Comment)
        }
    }
    Post.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Title is required",
                    },
                    notNull: {
                        msg: "Title is required",
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Description is required",
                    },
                    notNull: {
                        msg: "Description is required",
                    },
                },
            },
            UserId: DataTypes.INTEGER,
            CategoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
