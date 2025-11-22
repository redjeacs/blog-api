const db = require("../db/queries");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");
const { formatDate } = require("../middlewares/formatters");

exports.getAllPosts = async (req, res, next) => {
  try {
    posts = await db.getAllPosts();

    if (!posts || posts.length === 0)
      throw new CustomNotFoundError("No posts found");

    posts.forEach((post) => {
      post.formattedCreatedAt = formatDate(post.createdAt);
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
