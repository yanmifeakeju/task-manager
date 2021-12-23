import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { validateCreateUserRequest } from './middleware.js';
import {
  activateUser,
  createUser,
  getCurrentUser,
  updateUser,
  recoverAccount,
} from './controllers.js';

const UserRouter = Router();

UserRouter.route('/').post(validateCreateUserRequest, createUser);
UserRouter.route('/me')
  .get(protect, getCurrentUser)
  .put(protect, updateUser);
UserRouter.route('/token/:token').post(activateUser);
UserRouter.route('/recovery').post(recoverAccount);
export default UserRouter;
