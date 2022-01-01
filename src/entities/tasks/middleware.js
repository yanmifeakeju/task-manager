import ErrorResponse from '../../error/ErrorResponse.js';
import Task from './model.js';
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

export const getTaskFromParams = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.task);
    if (!task)
      return next(
        new ErrorResponse(
          `No task with identifier ${req.params.id}`,
          404,
        ),
      );

    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};
