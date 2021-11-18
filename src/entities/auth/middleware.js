import { validateLoginData } from './utils.js';

export const validateLoginRequest = (req, res, next) => {
  const { error, value } = validateLoginData(req.body);

  if (error) {
    if (error) {
      const { message } = error.details[0];
      return res
        .status(401)
        .json({ error: { status: 'Invalid request data', message } });
    }
  }
  req.body = value;
  next();
};
