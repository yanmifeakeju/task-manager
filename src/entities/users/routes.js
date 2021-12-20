import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { validateCreateUserRequest } from './middleware.js';
import {
  activateUser,
  createUser,
  getCurrentUser,
  updateUser,
} from './controllers.js';

const UserRouter = Router();

UserRouter.route('/').post(validateCreateUserRequest, createUser);
UserRouter.route('/me')
  .get(protect, getCurrentUser)
  .put(protect, updateUser);
UserRouter.route('/token/:token').post(activateUser);

export default UserRouter;
