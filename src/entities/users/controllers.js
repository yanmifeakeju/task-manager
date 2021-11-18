/* eslint-disable import/prefer-default-export */

import User from './model.js';

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({
      data: {
        message: `User with email ${user.email} created succesfully`,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

// export const updateUser = async (req, res) => {};
