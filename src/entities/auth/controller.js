import { loginUser } from '../users/service.js';

export const login = async (req, res, next) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({
      status: true,
      message: 'Login Successful',
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const revoke = async (req, res, next) => {
  try {
    const { user } = req;

    user.tokens = user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await user.save();

    res.status(200).json({ status: true, message: 'Successful' });
  } catch (error) {
    next(error);
  }
};

export const revokeAll = async (req, res, next) => {
  try {
    const { user } = req;

    user.tokens = [];
    await user.save();

    res.status(200).json({ status: true, message: 'Successful' });
  } catch (error) {
    next(error);
  }
};
