import { validateLoginData } from './helpers.js';

export const login = async (req, res) => {
  const { error, value } = validateLoginData(req.body);

  if (error) {
    const { message } = error.details[0];
    return res
      .status(401)
      .json({ error: { status: 'Invalid request data', message } });
  }
};
