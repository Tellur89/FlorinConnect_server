const { Router } = require("express");
const tokenController = require("../controllers/tokenContollers");

const tokenRouter = Router();

tokenRouter.route("/").get(tokenController.index);

tokenRouter.route("/").post(tokenController.create);

module.exports = tokenRouter;
