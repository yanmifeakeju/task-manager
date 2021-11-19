import jwt from 'jsonwebtoken';
import { JWTSignature } from '../config';

export const protect = async (req, res, next) => {
  let { token = null } = req.body;

  if (!token) {
    return res.status(403).json({
      error: {
        message: 'This is a protected and require authentication',
      },
    });
  }

  if (!token.startsWith('Bearer')) {
    return res.status(422).json({
      error: {
        message: 'Please provide a valid authutentication scheme',
      },
    });
  }

  [, token] = token.split(' ');

  const decoded = jwt.verify(token, JWTSignature);

  if (!decoded) {
    return res.status(403).json({
      error: {
        message: 'Please provide a valid authutentication token',
      },
    });
  }

  next();
};
