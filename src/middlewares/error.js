/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
export default function errorResponder(error, req, res, _next) {
  let { data = null } = error;
  let { message = 'Server Error' } = error;
  let { statusCode = 500 } = error;

  if (error.code && error.code === 11000) {
    message = `${Object.keys(error.keyValue)} is already registered`;
    statusCode = 409;
  }

  if (error.name && error.name === 'ValidationError') {
    const validationErrors = error.details.map(
      ({ path, message }) => ({
        field: path[0],
        message,
      }),
    );
    message = 'Validation Invalid data in request body';
    statusCode = 400;
    data = { validationErrors };
  }
  return res.status(statusCode).json({
    status: false,
    message,
    data,
    path: req.originalUrl,
  });
}
