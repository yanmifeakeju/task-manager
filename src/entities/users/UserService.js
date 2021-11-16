import User from './User.js';
import { validateCreateUserData } from './validation.js';

export const createUser = async (req, res) => {
  try {
    const { error, value } = await validateCreateUserData(req.body);

    if (error) {
      const { message } = error.details[0];

      return res
        .status(422)
        .json({ error: { status: 'Invalid request data', message } });
    }

    const user = await User.create(value);

    return res
      .status(201)
      .json({
        data: {
          message: `User with email ${user.email} created succesfully`
        }
      });
  } catch (error) {
    console.log(error);
  }
};
