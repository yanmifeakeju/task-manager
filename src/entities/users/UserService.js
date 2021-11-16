import User from './User.js';

export const createUser = async (req, res) => {
  const user = User.create(req.body);

  res.status(201).json({ message: `User with ${user.emal} created` });
};
