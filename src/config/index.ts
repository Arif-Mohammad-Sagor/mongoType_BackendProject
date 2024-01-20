import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  dbURL: process.env.MONGO_DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_SECRET,
  jwt_access_expires: process.env.JWT_EXPIRES,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
  node_dev: process.env.NODE_ENV,
};
