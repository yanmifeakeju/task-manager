import User from './User.js';
import { validateCreateUserData } from './validation.js';

export const createUser = async (req, res) => {
  const { error, value } = await validateCreateUserData(req.body);

  if (error) {
    const { message } = error.details[0];

    return res
      .status(422)
      .json({ error: { status: 'Invalid request data', message } });
  }

  return res.status(201).json(value);
};
