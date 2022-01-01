import Joi from 'joi';
import Task from './model.js';

export const create = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.task,
      owner: req.user.id,
    });

    res.status(201).json({
      status: true,
      message: 'Task Created',
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const addCollaborator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });
    const value = await schema.validateAsync(req.body);
    res.send();
  } catch (error) {
    next(error);
  }
};
