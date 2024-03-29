/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import arrayUniquePlugin from 'mongoose-unique-array';
import { JWTSignature } from '../../config/index.js';
import ErrorResponse from '../../error/ErrorResponse.js';

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
    active: {
      type: Boolean,
      default: false,
    },
    activationToken: {
      type: String,
    },
    activationTokeExpiresIn: {
      type: Date,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    resetToken: String,
    resetTokenExpiresIn: Date,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.tokens;
        delete ret.activationToken;
        delete ret.activationTokeExpiresIn;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(this.password, salt);
    this.password = password;
  }

  if (!this.active) {
    this.activationToken = crypto.randomBytes(10).toString('hex');
    this.activationTokeExpiresIn = new Date(
      new Date().setTime(new Date().getTime() + 30 * 60 * 1000),
    );
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
    throw new ErrorResponse('Invalid Credentials', 401);
  }

  const isValidCredentials = await bcrypt.compare(
    password,
    user.password,
  );

  if (!isValidCredentials) {
    throw new ErrorResponse('Invalid Credentials', 401);
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const payload = {
    id: this.id,
  };

  const token = jwt.sign(payload, JWTSignature, {
    expiresIn: '7d',
  });

  this.tokens.push({ token });
  await this.save();

  return token;
};

UserSchema.methods.generateResetToken = async function () {
  const token = crypto.randomBytes(4).toString('hex');

  this.resetToken = token;
  this.resetTokenExpiresIn = new Date(
    new Date().getTime() + 30 * 60000,
  );

  await this.save();
  return token;
};

UserSchema.methods.activate = async function () {
  this.activationToken = null;
  this.activationTokeExpiresIn = null;
  this.active = true;

  await this.save();

  return true;
};

UserSchema.plugin(arrayUniquePlugin);
const User = model('users', UserSchema);
export default User;
