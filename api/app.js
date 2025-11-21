const express = require("express");
const app = express();
const passport = require("passport");
const verifyToken = require("./middlewares/verifyToken");
require("./configs/cloudinaryConfig");

require("./configs/passportConfig");

const PORT = process.env.PORT || 8000;

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Routes

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

// Error

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Express app listening on port ${PORT}`);
});
