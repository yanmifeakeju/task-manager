import { createNewTask } from './service.js';

export const createTask = async (req, res, next) => {
  try {
    const task = createNewTask(req.body);
  } catch (error) {
    next(error);
  }
};
