import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { validateTaskCreation } from './middleware.js';

const router = Router();

// this will be a protected route

router.post('/', protect, validateTaskCreation, async (req, res) => {
  res.send('task router');
});

export default router;
