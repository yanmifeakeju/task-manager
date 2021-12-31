import Joi from 'joi';

export const validateCreateTask = async (data) => {
  const schema = Joi.object({
    title: Joi.string().required().trim().messages({
      'string.base': `"title" must be a string`,
    }),
    description: Joi.string().required().trim().messages({
      'string.base': `"description" must be a string`,
    }),
    priority: Joi.string().trim().valid('low', 'medium', 'high'),
  });

  return schema.validateAsync(data, { abortEarly: false });
};
