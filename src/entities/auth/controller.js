import { loginUser } from '../users/service.js';

export const login = async (req, res, next) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
