/* eslint-disable no-underscore-dangle */
import Task from './model.js';
import { validateNewTask } from './utils.js';

export const validateNewTaskRequest = (req, res, next) => {
  const { error, value } = validateNewTask(req.body);
  if (error) {
    const validationErrors = error.details.map(
      ({ path, message }) => ({
        field: path[0],
        message,
      }),
    );
    return res.status(400).json({
      status: false,
      message: 'Invalid data in request body',
      data: { validationErrors },
    });
  }

  req.body = value;
  next();
};

export const populateTaskFromRequestParams = async (
  req,
  res,
  next,
) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
  }).populate('owner');

  if (!task) {
    return res.status(404).json({
      status: false,
      message: 'Cannot retrieve task',
      data: null,
    });
  }

  if (req.user._id.toString() !== task.owner._id.toString()) {
    return res.status(401).json({
      status: false,
      message: 'You are unauthorized',
      data: null,
    });
  }
  req.task = task;
  next();
};
