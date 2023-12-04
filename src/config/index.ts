import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  dbURL: process.env.MONGO_DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  node_dev:process.env.NODE_ENV,
};
