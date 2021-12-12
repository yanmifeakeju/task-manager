import Joi from 'joi';

export const validateLoginData = async (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
  });

  return schema.validateAsync(data, { abortEarly: false });
};
