import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { addCollaborator, create, getTask } from './controllers.js';
import {
  getTaskFromParams,
  validateTaskCreation,
} from './middleware.js';

const router = Router();

// this will be a protected route

router.post('/', protect, validateTaskCreation, create);
router.get('/', protect, getTask);
router.put(
  '/:task/collaborate',
  protect,
  getTaskFromParams,
  addCollaborator,
);

export default router;
