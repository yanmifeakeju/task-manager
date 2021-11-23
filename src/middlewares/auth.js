import jwt from 'jsonwebtoken';
import { JWTSignature } from '../config/index.js';
import { findById } from '../entities/users/service.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.header('Authorization') ?? null;

    if (!token) {
      return res.status(403).json({
        error: {
          message: 'This is a protected and requires authentication',
        },
      });
    }

    if (!token.startsWith('Bearer')) {
      return res.status(422).json({
        status: false,
        message: 'Please provide a valid authutentication scheme',
        data: null,
      });
    }

    [, token] = token.split(' ');

    const decoded = jwt.verify(token, JWTSignature);

    if (!decoded) {
      return res.status(403).json({});
    }

    const user = await findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
        data: null,
      });
    }

    req.body.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      error: { message: 'Error authenticating the request' },
    });
  }
};
