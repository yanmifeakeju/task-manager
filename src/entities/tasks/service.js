/* eslint-disable no-unused-vars */
import Task from './model.js';

export const createNewTask = async (owner, data) => {
  const value = { ...data, owner };
  const task = await Task.create(value);
  return { message: 'Task created', task };
};

export const getTasks = async (ownerID) => {
  const tasks = await Task.find({ owner: ownerID });
  return {
    message: 'Here are your task',
    count: tasks.length,
    tasks,
  };
};

export const updateTask = async (owner, id, updatedFields) => {};

export const deleteTask = async (owner, taskid) => {};
