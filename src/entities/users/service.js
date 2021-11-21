import User from './model.js';

export const createNewUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  try {
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    const token = await user.generateAuthToken();
    return { message: `User with ${email} created`, token };
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (fields) => {};

export const updatePassword = async (id, password) => {};
