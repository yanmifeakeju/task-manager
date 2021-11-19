import User from '../users/model.js';

export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};
