import { validateCreateUserData } from './utils.js';

export const validateCreateUserRequest = (req, res, next) => {
  const { error, value } = validateCreateUserData(req.body);

  if (error) {
    const validationError = error.details.map(
      ({ path, message }) => ({
        path: path[0],
        message,
      }),
    );

    return res.status(422).json({
      error: { status: 'Invalid request data', validationError },
    });
  }

  req.body = value;
  next();
};
