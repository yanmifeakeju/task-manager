import { loginUser } from '../users/service.js';

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};
