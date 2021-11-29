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
  participants: [
    {
      participant: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'users',
      },
    },
  ],
});
TaskSchema.plugin(arrayUniquePlugin);
const Task = model('tasks', TaskSchema);
export default Task;
