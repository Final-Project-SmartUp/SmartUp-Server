const { Post, Comment } = require("../models");

class PostController {
    static async getAllPostByCategoryId(request, response, next) {
        try {
            const { categoryId } = request.params;
            const posts = await Post.findAll({
                where: {
                    CategoryId: categoryId,
                },
                include: {
                    model: Comment,
                },
            });

            if (posts.length === 0) {
                throw { status: 404, message: "Posts not found" };
            }

            response.status(200).json(posts);
        } catch (err) {
            if (err.status) {
                response.status(err.status).json({
                    message: err.message,
                });
            } else {
                response.status(500).json(err);
            }
        }
    }

    static async addPost(request, response, next) {
        try {
            const { title, description } = request.body;
            const post = await Post.create({
                title,
                description,
                UserId: 1, //! ini tegantung sama yang login
                CategoryId: 1, //! ini tergantung dia pas ngeadd ada dihalaman apa
            });
            response.status(201).json(post);
        } catch (err) {
            response.status(500).json(err);
        }
    }
}

module.exports = PostController;
