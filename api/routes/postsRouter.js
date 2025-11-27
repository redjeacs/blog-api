const { Router } = require("express");
const postsController = require("../controllers/postsController");
const verifyToken = require("../middlewares/verifyToken");
const isAuthor = require("../middlewares/isAuthor");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postsRouter = Router();

postsRouter.get("/", postsController.getAllPosts);
postsRouter.post(
  "/",
  verifyToken,
  isAuthor,
  upload.single("img"),
  postsController.createPost
);

postsRouter.get("/:postId", postsController.getPost);
postsRouter.put("/:postId", verifyToken, isAuthor /*editPost*/);
postsRouter.delete(
  "/:postId",
  verifyToken,
  isAuthor,
  postsController.deletePost
);

postsRouter.get("/:postId/comments", postsController.getComments);
postsRouter.post(
  "/:postId/comments",
  verifyToken,
  postsController.createComment
);

module.exports = postsRouter;
