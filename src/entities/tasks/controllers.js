import { createNewTask } from './service.js';

export const createTask = async (req, res, next) => {
  try {
    const { message, task } = await createNewTask(req.user, req.body);
    res.status(201).json({ status: true, message, data: { task } });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {};

export const deleteTask = async (req, res, next) => {};
