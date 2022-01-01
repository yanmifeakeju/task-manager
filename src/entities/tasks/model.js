import mongoose from 'mongoose';
import arrayUniquePlugin from 'mongoose-unique-array';

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
      },
      accepted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

TaskSchema.plugin(arrayUniquePlugin);
const Task = model('tasks', TaskSchema);

export default Task;
