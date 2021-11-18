import mongoose from 'mongoose';

import { databaseURL } from '../config/index.js';

const db = async () => {
  try {
    const connection = await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.

    return connection;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

db();
export default db;
