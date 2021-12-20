import jwt from 'jsonwebtoken';
import { JWTSignature } from '../config/index.js';
import User from '../entities/users/model.js';
import ErrorResponse from '../error/ErrorResponse.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.header('Authorization') ?? null;

    if (!token) {
      return next(
        new ErrorResponse(
          'This a protected route and requires authentication',
          401,
        ),
      );
    }

    if (!token.startsWith('Bearer')) {
      return next(
        new ErrorResponse(
          'This is an invalid authentication scheme',
          403,
        ),
      );
    }

    [, token] = token.trim().split(' ');

    if (!token) {
      return next(
        new ErrorResponse('You must provide a valid token', 403),
      );
    }

    const decoded = jwt.verify(token, JWTSignature);

    if (!decoded) {
      return next(new ErrorResponse('Invalid token provided ', 403));
    }

    const user = await User.findOne({
      _id: decoded.id,
      'tokens.token': token,
    });

    if (!user) {
      return next(
        new ErrorResponse(
          'Unauthorized token. Please re-authenticate',
          401,
        ),
      );
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
