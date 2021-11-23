import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { login, revoke } from './controller.js';
import { validateLoginRequest } from './middleware.js';

const authRouter = Router();

authRouter.route('/').post(validateLoginRequest, login);
authRouter.route('/revoke').post(protect, revoke);

export default authRouter;
