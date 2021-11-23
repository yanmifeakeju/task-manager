import { createNewUser, findById } from './service.js';

export const createUser = async (req, res, next) => {
  try {
    const { message, token } = await createNewUser(req.body);

    return res.status(201).json({
      status: true,
      message,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await findById(req.body.id);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
