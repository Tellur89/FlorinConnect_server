const { Router } = require("express");
const tokenController = require("../controllers/tokenContollers");

const tokenRouter = Router();

tokenRouter.route("/:id").patch(tokenController.createToken);

module.exports = tokenRouter;
