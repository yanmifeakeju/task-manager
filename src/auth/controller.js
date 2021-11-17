import User from '../entities/users/User.js';
import { validateLoginData } from './helpers.js';

export const login = async (req, res) => {
  try {
    const { error, value } = validateLoginData(req.body);

    if (error) {
      const { message } = error.details[0];
      return res
        .status(401)
        .json({ error: { status: 'Invalid request data', message } });
    }

    const user = await User.findByCredentials(value);
  } catch (error) {}
};
