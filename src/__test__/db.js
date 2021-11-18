import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

let mongoServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

export const closeConnection = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  const keys = Object.keys(collections);

  keys.forEach((key) => {
    collections[key].deleteMany();
  });
};
