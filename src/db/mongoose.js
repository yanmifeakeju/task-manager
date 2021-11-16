import mongoose from 'mongoose';

import { databaseURL } from '../config/index.js';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // console.log('Connected to database');

    return connection;
  } catch (error) {
    console.log(error);
  }
};

const db = connectDB().then((connection) => connection);

export default db;
