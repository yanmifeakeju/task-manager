/* eslint-disable import/prefer-default-export */

import { createNewUser } from './service.js';

export const createUser = async (req, res) => {
  try {
    const { message, token } = await createNewUser(req.body);

    return res.status(201).json({
      data: {
        message,
        token,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

// export const updateUser = async (req, res) => {};
