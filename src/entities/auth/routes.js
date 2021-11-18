import { Router } from 'express';
import { login } from './controller.js';
import { validateLoginRequest } from './middleware.js';

const authRouter = Router();

authRouter.route('/').post(validateLoginRequest, login);

export default authRouter;
