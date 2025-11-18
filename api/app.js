const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const sessionConfig = require("./configs/sessionConfig");
require("./configs/cloudinaryConfig");

const PORT = process.env.PORT || 8000;

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session

app.use(sessionConfig());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

require("./config/passportConfig");

// Routes

app.use("/", indexRouter);
app.use("/binder", binderRouter);

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
