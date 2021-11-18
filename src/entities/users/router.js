import { Router } from 'express';
import { createUser } from './controllers.js';
// eslint-disable-next-line import/named
import { validateCreateUserRequest } from './middleware.js';

const UserRouter = Router();

UserRouter.route('/').post(validateCreateUserRequest, createUser);

export default UserRouter;
