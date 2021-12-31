import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';

const router = Router();

// this will be a protected route

router.post('/', protect, async (req, res) => {
  res.send('task router');
});

export default router;
