import jwt from 'jsonwebtoken';
import { JWTSignature } from '../config/index.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.header('Authorization') ?? null;
    console.log(token);

    if (!token) {
      return res.status(403).json({
        error: {
          message: 'This is a protected and requires authentication',
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

    console.log(token);

    const decoded = jwt.verify(token, JWTSignature);

    if (!decoded) {
      return res.status(403).json({
        error: {
          message: 'Please provide a valid authutentication token',
        },
      });
    }

    next();
  } catch (error) {
    res.status(401).send({
      error: { message: 'Error authenticating the request' },
    });
  }
};
