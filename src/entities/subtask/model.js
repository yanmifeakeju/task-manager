import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SubTaskSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'tasks',
  },

  assigned: [
    {
      assign: {
        type: '',
        required: true,
        unique: true,
        ref: 'tasks.participants.participant',
      },
    },
  ],
});

const Task = model('subTasks', SubTaskSchema);
export default Task;
