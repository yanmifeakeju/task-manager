import { validateLoginData } from './utils.js';

export const validateLoginRequest = (req, res, next) => {
  const { error, value } = validateLoginData(req.body);

  if (error) {
    if (error) {
      const validationErrors = error.details.map(
        ({ path, message }) => ({
          field: path[0],
          message,
        }),
      );
      return res.status(400).json({
        status: false,
        message: 'Invalid data in request body',
        data: { validationErrors },
      });
    }
  }
  req.body = value;
  next();
};
