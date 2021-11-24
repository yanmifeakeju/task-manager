import jwt from 'jsonwebtoken';
import { JWTSignature } from '../config/index.js';
import User from '../entities/users/model.js';

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

    const user = await User.findOne({
      _id: decoded.id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      status: false,
      message: 'Please authenticate the request',
      data: null,
    });
  }
};
