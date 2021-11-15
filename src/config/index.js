import "dotenv/config";
import { Env } from "@humanwhocodes/env";

const env = new Env();

export const databaseURL = env.get("MONGO_URI");

export default env;
