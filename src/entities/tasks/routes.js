import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import { createTask, getTasks } from './controllers.js';
import { validateNewTaskRequest } from './middleware.js';

const taskRouter = Router();

taskRouter
  .route('/')
  .post(protect, validateNewTaskRequest, createTask)
  .get(protect, getTasks);

export default taskRouter;
