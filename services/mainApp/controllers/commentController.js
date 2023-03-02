const { Comment } = require("../models");

class CommentController {
    static async addComment(request, response, next) {
        try {
            const { description } = request.body;
            const comment = await Comment.create({
                description,
                PostId: 1, //!Tergantung postan mana yang di add comment
                UserId: 1, //!Tergantung user siapa yang ngepost
            });
            response.status(201).json(comment);
        } catch (err) {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

module.exports = CommentController;
