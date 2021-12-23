/* eslint-disable no-underscore-dangle */
import * as UserService from './service.js';
import { validateUpdate } from './utils.js';

export const createUser = async (req, res, next) => {
  try {
    const { message, code = 201 } = await UserService.createNewUser(
      req.body,
    );

    return res.status(code).json({
      status: !(code >= 400),
      message,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { user } = req;
    res.status(200).json({
      status: true,
      message: 'User found',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const value = await validateUpdate(req.body);
    const user = await UserService.update(req.user._id, value);

    res.status(200).json({
      status: true,
      message: 'User Update',
      data: { user },
    });
    res.send();
  } catch (error) {
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const {
      status = true,
      code = 200,
      message,
    } = await UserService.activateUser(req.params.token);

    res.status(code).json({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    await UserService.resetPasswordToken(req.body);
    res.send();
  } catch (error) {
    next(error);
  }
};

export const updateAccountPassword = async (req, res, next) => {
  try {
    await UserService.updateUserPassword(req.body);
    res.send();
  } catch (error) {
    next(error);
  }
};
