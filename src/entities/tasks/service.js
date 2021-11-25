/* eslint-disable no-unused-vars */
import Task from './model.js';
import User from '../users/model.js';

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

export const updateTaskParticipants = async (owner, id, email) => {
  const participant = await User.findOne({ email });
};

export const deleteTask = async (owner, taskid) => {};
