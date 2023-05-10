const { Router } = require("express");
const userController = require("../controllers/usersController");
const authenticator = require("../middleware/authenticator");
const userRouter = Router();

userRouter.route("/").get(userController.index).post(userController.createUser);
userRouter.route("/admin", authenticator).get(userController.showAdmin);
userRouter.route("/login").post(userController.verifyLogin);

userRouter
  .route("/:id")
  .get(userController.showById)
  .patch(userController.updateUser);
userRouter
  .route("/name/:username")
  .get(userController.showByUsername)
  .delete(userController.destroyUser);

module.exports = userRouter;
