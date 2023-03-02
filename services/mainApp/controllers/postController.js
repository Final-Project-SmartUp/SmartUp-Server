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
            next(err)
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
            next(err)
        }
    }

    static async editPost(request, response, next) {
        try {
            console.log("asdsad");
            const { title, description } = request.body;
            const { postId } = request.params;

            const post = await Post.findOne({
                where: {
                    id: postId,
                },
            });

            if (!post) {
                throw { status: 404, message: "Post not found" };
            }

            await Post.update(
                {
                    title,
                    description,
                },
                {
                    where: {
                        id: postId,
                    },
                }
            );
            response.status(200).json({
                message: `Post with id ${postId} has been updated`,
            });
        } catch (err) {
            next (err)
        }
    }

    static async deletePost(request, response, next) {
        try {
            const { postId } = request.params;
            const post = await Post.findOne({
                where: {
                    id: postId,
                },
            });

            if (!post) {
                throw { status: 404, message: "Post not found" };
            }

            await Post.destroy({
                where: {
                    id: postId,
                },
            });

            response.status(200).json({
                message: `Post with id ${postId} has been deleted`,
            });
        } catch (err) {
           next(err)
        }
    }
}

module.exports = PostController;
