import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { validateCreateUserRequest } from './middleware.js';
import {
  activateUser,
  createUser,
  getCurrentUser,
} from './controllers.js';

const UserRouter = Router();

UserRouter.route('/').post(validateCreateUserRequest, createUser);
UserRouter.route('/me').get(protect, getCurrentUser);
UserRouter.route('/token/:token').post(activateUser);

export default UserRouter;
