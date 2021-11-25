/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWTSignature } from '../../config/index.js';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
          unique: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.tokens;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    },
  },
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(this.password, salt);
    this.password = password;
  }
  next();
});

UserSchema.statics.findByCredentials = async function ({
  email,
  password,
}) {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isValidCredentials = await bcrypt.compare(
    password,
    user.password,
  );

  if (!isValidCredentials) {
    throw new Error('Invalid Credentials');
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const payload = {
    id: this.id,
  };

  const token = await jwt.sign(payload, JWTSignature, {
    expiresIn: '7d',
  });

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

const User = model('users', UserSchema);
export default User;
