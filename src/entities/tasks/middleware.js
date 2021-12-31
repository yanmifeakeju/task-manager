import { validateCreateTask } from './utils.js';

export const validateTaskCreation = async (req, res, next) => {
  try {
    const value = await validateCreateTask(req.body);
    req.task = value;
    next();
  } catch (error) {
    next(error);
  }
};
