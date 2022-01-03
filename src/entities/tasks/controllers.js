import Joi from 'joi';
import ErrorResponse from '../../error/ErrorResponse.js';
import User from '../users/model.js';
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

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .and([
        {
          $or: [
            { owner: req.user.id },
            { 'collaborators.collaborator': req.user.id },
          ],
        },
      ])
      .populate('owner')
      .populate('collaborators.collaborator');

    res.status(200).json({
      status: true,
      message: 'tasks retrieved',
      data: { count: tasks.length, tasks },
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.find({
      _id: req.params.task,
      owner: req.user.id,
    }).populate('owner');

    res.status(200).json({
      status: true,
      message: 'task retrieved',
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
    const user = await User.findOne({ email: value.email });

    if (!user)
      return next(
        new ErrorResponse(
          `No account with ${value.email}  exists.`,
          404,
        ),
      );

    const { task } = req;
    task.collaborators.push({ collaborator: user.id });
    task.save();
    console.log(task);
    res.send();
  } catch (error) {
    next(error);
  }
};
