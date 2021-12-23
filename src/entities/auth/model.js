import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TokenSchema = new Schema({});

export default model('token', TokenSchema);
