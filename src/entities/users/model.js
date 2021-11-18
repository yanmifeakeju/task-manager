/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(this.password, salt);
  this.password = password;
  next();
});

const User = model('users', UserSchema);

UserSchema.statics.findByCredentials = async function ({
  email,
  password,
}) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid Credentials');
  }
  const isValidCredentials = await bcrypt.compare(
    password,
    user.password,
  );
};

export default User;
