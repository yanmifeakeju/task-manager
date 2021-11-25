import { Router } from 'express';
import { protect } from '../../middlewares/auth.js';
import {
  createTask,
  getTasks,
  updateTaskParticipants,
} from './controllers.js';
import {
  populateTaskFromRequestParams,
  validateNewTaskRequest,
} from './middleware.js';

const taskRouter = Router();

taskRouter
  .route('/')
  .post(protect, validateNewTaskRequest, createTask)
  .get(protect, getTasks);

// handle participants
taskRouter
  .route('/:taskId/participants')
  .put(
    protect,
    populateTaskFromRequestParams,
    updateTaskParticipants,
  );

export default taskRouter;
