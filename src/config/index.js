import { Env } from '@humanwhocodes/env';

const env = new Env();
export const databaseURL =
  env.get('NODE_ENV') === 'test'
    ? env.get('MONGO_URI_TEST')
    : env.get('MONGO_URI');

export default env;
