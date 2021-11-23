import Joi from 'joi';

export const validateLoginData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
  });

  return schema.validate(data, { abortEarly: false });
};
