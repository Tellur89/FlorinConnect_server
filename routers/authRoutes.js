const { Router } = require("express");
const authController = require("../controllers/authContoller");
const authRouters = Router();

//complete this in a bit

authRouters.get("/", authController.handleLogin);

module.exports = authRouters;
