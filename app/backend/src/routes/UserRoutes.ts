import { Router } from 'express';
import UserController from '../controllers/userController';
import tokenVerifier from '../middleware/tokenVerifier';

const UserRouter = Router();

const userController = new UserController();

UserRouter.post('/', userController.login);
UserRouter.get('/role', tokenVerifier, userController.role);

export default UserRouter;
