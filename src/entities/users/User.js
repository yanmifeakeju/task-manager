import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
    // validate(value) {
    //   // if(Date.now )
    // },
  }
});

const User = model('users', UserSchema);

export default User;
