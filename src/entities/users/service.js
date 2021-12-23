/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

import ErrorResponse from '../../error/ErrorResponse.js';
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
    if (process.env.NODE_ENV === 'production')
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
  }
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findByCredentials({
    email,
    password,
  });

  if (user && !user.active) {
    throw new ErrorResponse(
      'Please activate you need to activate your account',
      401,
    );
  }
  const token = await user.generateAuthToken();

  return {
    status: false,
    message: 'Authentication Token',
    data: { token },
  };
};

export const update = async (id, value) => {
  const user = await User.findByIdAndUpdate(id, value, {
    new: true,
    runValidators: true,
  });

  return user;
};

export const findById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const activateUser = async (activationToken) => {
  const user = await User.findOne({ activationToken });

  if (!user) {
    return {
      status: false,
      code: 404,
      message:
        'Unable to activate account. Cannot find account with the activation token.',
    };
  }

  if (user.active) {
    return {
      status: false,
      code: 409,
      message: 'Account activated',
    };
  }

  await user.activate();

  return {
    message: 'Account Activated',
  };
};

export const resetPasswordToken = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse(
      'Please confirm that you have provided a valid email address with a registered account',
      404,
    );
  }

  await user.generateResetToken();

  // TODO::Send token in email
};

// export const updatePassword = async (id, password) => {};
