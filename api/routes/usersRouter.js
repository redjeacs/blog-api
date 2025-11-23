const { Router } = require("express");
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/verifyToken");

const usersRouter = Router();

usersRouter.post("/", usersController.createUser);
usersRouter.post("/signin", usersController.signin);
usersRouter.get("/session", verifyToken, usersController.checkSignin);

module.exports = usersRouter;
