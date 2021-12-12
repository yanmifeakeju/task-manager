import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server-core';

let replset;

export const connect = async () => {
  replset = await MongoMemoryReplSet.create({
    replset: { count: 4 },
  });

  const uri = replset.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(uri, mongooseOpts);
};

export const closeConnection = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await replset.stop();
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  const keys = Object.keys(collections);

  if (keys.length) {
    keys.forEach((key) => {
      collections[key].deleteMany();
    });
  }
};
