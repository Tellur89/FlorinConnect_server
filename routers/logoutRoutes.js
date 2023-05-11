//similar to refresh but change routes
//Remember to add into app.js
const { Router } = require("express");
const logoutController = require("../controllers/logoutController");
const logoutRouters = Router();

//complete this in a bit

logoutRouters.get("/", logoutController.handleLogout);

module.exports = logoutRouters;
