import Joi from 'joi';

export const validateNewTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().trim().max(255).required(),
    description: Joi.string().trim().required(),
    priority: Joi.string().trim(),
  });

  return schema.validate(task, { abortEarly: false });
};
