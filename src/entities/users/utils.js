import Joi from 'joi';

export const validateCreateUserData = (user) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .message('Please provide a first name'),
    lastName: Joi.string()
      .required()
      .trim()
      .message('Please provide a last name'),
    username: Joi.string()
      .required()
      .trim()
      .message('Please provide a username'),
    email: Joi.string()
      .email()
      .required()
      .trim()
      .message('You have not provided a valid email'),
    password: Joi.string().trim().required().min(6),
  });

  return schema.validate(user, { abortEarly: false });
};
