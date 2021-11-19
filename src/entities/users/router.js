import { Router } from 'express';
import { protect } from '../../services/auth.js';
import { createUser } from './controllers.js';
// eslint-disable-next-line import/named
import { validateCreateUserRequest } from './middleware.js';

const UserRouter = Router();

UserRouter.route('/').post(validateCreateUserRequest, createUser);
UserRouter.route('/me').post(protect, (req, res, next) => {
  res.send('welcome');
});

export default UserRouter;
