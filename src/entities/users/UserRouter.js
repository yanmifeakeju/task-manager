import { Router } from 'express';
import { createUser } from './UserService.js';

const UserRouter = Router();

UserRouter.route('/').post(createUser);

export default UserRouter;
