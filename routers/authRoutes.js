const { Router } = require("express");
const authController = require("../controllers/authContollers");
const authRouters = Router();

//complete this in a bit

authRouters.post("/", authController.handleLogin);

module.exports = authRouters;
