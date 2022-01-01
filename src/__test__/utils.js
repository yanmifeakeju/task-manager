import mongoose from 'mongoose';
import Task from '../entities/tasks/model.js';
import User from '../entities/users/model.js';

const validData = {
  firstName: 'user',
  lastName: 'one',
  username: 'user_one',
  email: 'user@email.com',
  password: 'user$passw0rD',
  active: true,
};

const validTask = {
  title: 'test task',
  description: 'test description',
  owner: mongoose.Types.ObjectId(),
};

export const createUser = async (data = validData) => {
  const user = await User.create(data);
  return user;
};

export const createTaskWithUser = async (data = validTask) => {
  const user = await createUser();
  const task = await Task.create({ ...data, owner: user.id });
  return { user, task };
};

export const generateAuthToken = async () => {
  const user = await createUser();
  const token = await user.generateAuthToken();

  return token;
};
