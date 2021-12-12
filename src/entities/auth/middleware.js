import { validateLoginData } from './utils.js';

export const validateLoginRequest = async (req, res, next) => {
  try {
    const value = await validateLoginData(req.body);

    req.body = value;
    next();
  } catch (error) {
    next(error);
  }
};
