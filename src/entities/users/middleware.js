import { validateCreateUserData } from './utils.js';

export const validateCreateUserRequest = async (req, res, next) => {
  try {
    const value = await validateCreateUserData(req.body);

    req.body = value;
    next();
  } catch (error) {
    next(error);
  }
};
