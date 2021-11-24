import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { validateCreateUserRequest } from './middleware.js';
import { createUser, getCurrentUser } from './controllers.js';

const UserRouter = Router();

UserRouter.route('/').post(validateCreateUserRequest, createUser);
UserRouter.route('/me').get(protect, getCurrentUser);

export default UserRouter;
