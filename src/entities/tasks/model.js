/* eslint-disable array-callback-return */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import ErrorResponse from '../../error/ErrorResponse.js';

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  collaborators: [
    {
      collaborator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: true,
      },
      accepted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

TaskSchema.pre('save', async function (next) {
  if (this.isModified('collaborators')) {
    const newCollaborator =
      this.collaborators[this.collaborators.length - 1];

    const isExistingCollaborator = this.collaborators.filter(
      (collaborator, index) => {
        if (index !== this.collaborators.length - 1) {
          return (
            collaborator.collaborator.id ===
            newCollaborator.collaborator.id
          );
        }
      },
    );

    if (isExistingCollaborator.length) {
      const error = new ErrorResponse(
        'User already a collaborator on this task',
        409,
      );

      next(error);
    }
  }
});
const Task = model('tasks', TaskSchema);

export default Task;
