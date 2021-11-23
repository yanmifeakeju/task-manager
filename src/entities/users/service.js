import User from './model.js';

export const createNewUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  });
  const token = await user.generateAuthToken();
  return { message: `User with email ${email} created`, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findByCredentials({ email, password });
  const token = await user.generateAuthToken();

  return token;
};

export const findById = async (id) => {
  const user = await User.findById(id);
  return user;
};

// export const updatePassword = async (id, password) => {};
