import mongoose from 'mongoose';

import { databaseURL } from '../config/index.js';

let db;

try {
  db = await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Connected to database');
} catch (error) {
  console.log(error);
}

export default db;
