/* eslint-disable no-useless-escape */
import Joi from 'joi';

export const validateCreateUserData = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().messages({
      'string.base': `"firstName" must be a string`,
    }),
    lastName: Joi.string().required().trim().messages({
      'string.base': '"lastName" must be a string',
    }),
    username: Joi.string().required().trim().min(4).max(30).messages({
      'string.base': '"username" must be a string',
    }),
    email: Joi.string().email().required().trim(),
    password: Joi.string().trim().required().min(6).messages({
      'string.min':
        '"password" cannot be less than six (6) characters',
    }),
  });

  return schema.validate(user, { abortEarly: false });
};
