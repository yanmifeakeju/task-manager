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
          'This a protected route. Please authorize request',
          401,
        ),
      );
    }

    if (!token.startsWith('Bearer')) {
      return next(
        new ErrorResponse(
          'This is an invalid authentication scheme',
          401,
        ),
      );
    }

    [, token] = token.split(' ');

    const decoded = jwt.verify(token, JWTSignature);

    if (!decoded) {
      return res.status(403).json({});
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
    next(new ErrorResponse('Invalid Token', 401));
  }
};
