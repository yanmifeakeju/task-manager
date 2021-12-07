import * as UserService from './service.js';

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
