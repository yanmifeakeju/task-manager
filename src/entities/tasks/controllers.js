/* eslint-disable no-unused-vars */
import * as TaskService from './service.js';

export const createTask = async (req, res, next) => {
  try {
    const { message, task } = await TaskService.createNewTask(
      req.user,
      req.body,
    );
    res.status(201).json({ status: true, message, data: { task } });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { message, count, tasks } = await TaskService.getTasks(
      req.user.id,
    );
    return res
      .status(200)
      .json({ status: true, message, data: { count, tasks } });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {};

export const deleteTask = async (req, res, next) => {};
