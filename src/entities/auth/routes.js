import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { login, revoke, revokeAll } from './controller.js';
import { validateLoginRequest } from './middleware.js';

const authRouter = Router();

authRouter.route('/').post(validateLoginRequest, login);
authRouter.route('/revoke').post(protect, revoke);
authRouter.route('/revokeAll').post(protect, revokeAll);

export default authRouter;
