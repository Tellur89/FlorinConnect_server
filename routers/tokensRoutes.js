const { Router } = require('express');
const tokenController = require('../controllers/tokenContollers');

const tokenRouter = Router();

tokenRouter.route('/delete/:token').delete(tokenController.destroy);
tokenRouter.route('/admin/:token').post(tokenController.checkIfAdmin);

// tokenRouter.route("/").post(tokenController.create);

module.exports = tokenRouter;
