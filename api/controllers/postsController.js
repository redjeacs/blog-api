const db = require("../db/queries");

exports.getAllPosts = async (req, res, next) => {
  try {
    posts = await db.getAllPosts();
  } catch (err) {
    next(err);
  }
};
