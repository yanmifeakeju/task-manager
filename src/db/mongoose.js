import mongoose from 'mongoose';

import { databaseURL } from '../config/index.js';

mongoose.Promise = global.Promise;

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on('error', () =>
  console.error.bind(console, 'connection error'),
);

conn.once('open', () =>
  console.info('Connection to Database is successful'),
);

export default conn;
