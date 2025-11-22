module.exports = function isAuthor(req, res, next) {
  if (req.user && req.user.isAuthor) {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Author only." });
};
