const express = require("express");
const PostController = require("../controllers/postController");
const postRouter = express.Router();

postRouter.get("/:categoryId", PostController.getAllPostByCategoryId);
postRouter.post("/", PostController.addPost);
postRouter.patch("/:postId", PostController.editPost);
postRouter.delete("/:postId", PostController.deletePost);

module.exports = postRouter;
