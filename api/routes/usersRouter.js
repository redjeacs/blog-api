const { Router } = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = Router();

indexRouter.get("/", usersController.renderHomePage);

usersRouter.post("/signup", usersController.signupPost);
usersRouter.post("/signin", usersController.signinPost);
usersRouter.get("/signout", usersController.signoutGet);

module.exports = usersRouter;
