const { Router } = require('express');
const userController = require('../controllers/usersController');

const userRouter = Router();

userRouter.route('/').get(userController.index).post(userController.createUser);
userRouter.route('/admin').get(userController.showAdmin);

userRouter.route('/:id').get(userController.showById).patch(userController.updateUser);
userRouter.route('/name/:username').get(userController.showByUsername).delete(userController.destroyUser);

module.exports = userRouter;
