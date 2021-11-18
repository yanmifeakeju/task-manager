import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = await MongoMemoryServer.create();

export const connect = async () => {
  const uri = mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  };

  await mongoose.connect(uri, mongooseOpts);
};

export const closeConnection = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  console.log(collections);
  const keys = Object.keys(collections);
  collections.forEach((collection) => {
    console.log(collection);
  });
};
