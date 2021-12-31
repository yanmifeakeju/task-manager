import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { create } from './controllers.js';
import { validateTaskCreation } from './middleware.js';

const router = Router();

// this will be a protected route

router.post('/', protect, validateTaskCreation, create);

export default router;
