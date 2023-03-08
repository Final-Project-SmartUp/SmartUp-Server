const express = require("express");
const PostController = require("../controllers/postController");
const authentication = require("../middlewares/auth");
const postRouter = express.Router();

postRouter.use(authentication);
postRouter.post("/", PostController.addPost);
postRouter.get("/:categoryId", PostController.getAllPostByCategoryId);
postRouter.get("/postDetail/:postId", PostController.getPostById);
postRouter.patch("/:postId", PostController.editPost);
postRouter.delete("/:postId", PostController.deletePost);

module.exports = postRouter;
