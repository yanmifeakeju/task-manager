import Task from './model.js';

export const createNewTask = async (owner, data) => {
  const value = { ...data, owner };
  const task = await Task.create(value);
  return { message: 'Task created', task };
};

export const updateTask = async (owner, id, updatedFields) => {};

export const deleteTask = async (owner, taskid) => {};
