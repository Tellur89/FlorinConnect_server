const { Router } = require("express");
const refreshTokenController = require("../controllers/refreshTokenControllers");
const refreshRouters = Router();

//complete this in a bit

refreshRouters.route("/").get(refreshTokenController.handleRefreshToken);

module.exports = refreshRouters;
