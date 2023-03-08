const { Comment } = require("../models");
const axios = require("axios");

class CommentController {
    static async addComment(request, response, next) {
        try {
            const { description, PostId, UserId } = request.body;

            const { data: user } = await axios({
                method: "GET",
                url: `http://localhost:3001/users/${UserId}`,
            });

            const comment = await Comment.create({
                description,
                PostId, //!Tergantung postan mana yang di add comment
                UserId, //!Tergantung user siapa yang ngepost
                profileName: user.profileName,
            });
            response.status(201).json(comment);
        } catch (err) {
            console.log(err,'ini dia error nya addcomment');
            next(err);
        }
    }

    static async editComment(request, response, next) {
        try {
            const { commentId } = request.params;
            const { description } = request.body;

            const comment = await Comment.findOne({
                where: {
                    id: commentId,
                },
            });

            if (!comment) {
                throw { status: 404, message: "Comment not found" };
            }

            await Comment.update(
                {
                    description,
                },
                {
                    where: {
                        id: commentId,
                    },
                }
            );

            response.status(200).json({
                message: `Comment with id ${commentId} has been edited`,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteComment(request, response, next) {
        try {
            const { commentId } = request.params;
            const comment = await Comment.findOne({
                where: {
                    id: commentId,
                },
            });

            if (!comment) {
                throw { status: 404, message: "Comment not found" };
            }

            await Comment.destroy({
                where: {
                    id: commentId,
                },
            });

            response.status(200).json({
                message: `Comment with id ${commentId} has been deleted`,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CommentController;
