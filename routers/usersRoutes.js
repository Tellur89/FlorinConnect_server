const { Router } = require('express');
const userController = require('../controllers/usersController');

const userRouter = Router();

userRouter.route('/').get(userController.index).post(userController.createUser);
userRouter.route('/admin').get(userController.showAdmin);
userRouter.route('/:username').get(userController.showByUsername);
userRouter.route('/:id').get(userController.showById).patch(userController.updateUser).delete(userController.destroyUser);

module.exports = userRouter;
