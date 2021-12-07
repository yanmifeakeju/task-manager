import mongoose from 'mongoose';
import { sendActivationToken } from '../../services/email/sendActivationToken.js';

import User from './model.js';

export const createNewUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const [user] = await User.create(
    [
      {
        firstName,
        lastName,
        username,
        email,
        password,
      },
    ],
    { session },
  );

  try {
    await sendActivationToken({
      email: user.email,
      token: user.activationToken,
    });
    await session.commitTransaction();
    session.endSession();
    return {
      message: `User created. Please check your email ${user.email} to activate your account`,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });
  const token = await user.generateAuthToken();

  return token;
};

export const findById = async (id) => {
  const user = await User.findById(id);
  return user;
};

// export const updatePassword = async (id, password) => {};
