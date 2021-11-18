import User from '../users/model.js';

export const login = async (req, res) => {
  try {
    const token = await User.findByCredentials(req.body);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};
