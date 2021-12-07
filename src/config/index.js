import { Env } from '@humanwhocodes/env';

const env = new Env();
export const databaseURL = env.get('MONGO_URI');

export const JWTSignature = env.get('JWT_SIGN');

export default env;
