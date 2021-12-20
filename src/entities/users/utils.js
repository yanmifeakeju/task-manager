/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
import Joi from 'joi';

export const validateCreateUserData = async (data) => {
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
    password: Joi.string()
      .trim()
      .required()
      .min(6)
      .regex(
        /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-5])(?=.*\W).*$/,
      )
      .messages({
        'string.min':
          '"password" cannot be less than six (6) characters',
        'string.pattern.base':
          'password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character',
      }),
  });

  return schema.validateAsync(data, { abortEarly: false });
};

export const validateUpdate = async (data) => {
  const schema = Joi.object({
    username: Joi.string().trim(),
  });

  return schema.validateAsync(data, { abortEarly: false });
};
