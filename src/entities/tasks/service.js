/* eslint-disable no-underscore-dangle */
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

export const updateTaskParticipants = async (taskToUpdate, email) => {
  const task = taskToUpdate;
  const user = await User.findOne({ email });

  if (!user) {
    return {
      code: 404,
      status: false,
      message: 'No user with email exists',
    };
  }

  const participant = user.id;
  task.participants.push({ participant });
  await task.save();

  // figure out population

  return {
    code: 200,
    status: true,
    message: 'Task Updated',
    task,
  };
};

export const deleteTask = async (owner, taskid) => {};
