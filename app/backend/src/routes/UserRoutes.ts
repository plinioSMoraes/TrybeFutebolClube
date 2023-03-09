import { Router } from 'express';
import UserController from '../controllers/userController';

const UserRouter = Router();

const userController = new UserController();

UserRouter.post('/', userController.login);

export default UserRouter;
