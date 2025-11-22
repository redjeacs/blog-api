const { Router } = require("express");
const postsController = require("../controllers/postsController");
const verifyToken = require("../middlewares/verifyToken");
const isAuthor = require("../middlewares/isAuthor");

const postsRouter = Router();

postsRouter.get("/", postsController.getAllPosts);
postsRouter.post("/", verifyToken, isAuthor /*createPost*/);

postsRouter.get("/:postId" /*getPost*/);
postsRouter.put("/:postId", verifyToken, isAuthor /*editPost*/);
postsRouter.delete("/:postId", verifyToken, isAuthor /*deletePost*/);

postsRouter.post("/comments", verifyToken /*createComment*/);

module.exports = postsRouter;
