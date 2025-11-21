const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");
const validators = require("../middlewares/validators");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = [
  validators.signupValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const data = matchedData(req);
      if (!data)
        throw new CustomNotFoundError("provided user information is invalid");
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.createUser(req.body.username, hashedPassword);
      const user = await db.getUser("username", req.body.username);

      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ message: "User created", token, user: payload });
    } catch (err) {
      return next(err);
    }
  },
];

exports.signin = [
  validators.signinValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const data = matchedData(req);
      if (!data) throw new CustomNotFoundError("login information is invalid!");
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user)
          return res
            .status(401)
            .json({ message: info?.message || "Invalid credentials" });

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res
          .status(200)
          .json({ message: "You are logged in", token, user: payload });
      })(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
];

exports.signout = async (req, res, next) => {
  if (!req.cookies.token)
    throw new CustomNotFoundError("No active session found");
  req.logout(async (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
