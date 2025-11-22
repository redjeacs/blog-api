const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");
const { formatDate } = require("../middlewares/formatters");
const validators = require("../middlewares/validators");
const cloudinary = require("cloudinary").v2;

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await db.getAllPosts();

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

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await db.getPost("id", postId);
    if (!post) throw new CustomNotFoundError("Post does not exist");

    post.formattedCreatedAt = formatDate(post.createdAt);

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = [
  validators.createPostValdiator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const userId = req.user.id;

    if (!req.file) {
      return next(new CustomNotFoundError("No post image"));
    }

    try {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, async (error, result) => {
          if (error) return next(error);
          await db.createPost(
            userId,
            req.body.title,
            req.body.content,
            result.secure_url,
            req.body.isPublished
          );
          res.status(200).json({ message: "Post created" });
        })
        .end(req.file.buffer);
    } catch (err) {
      next(err);
    }
  },
];
