const {
  NODE_ENV = 'development',
  DB_NAME,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  PORT, // = 3000
} = process.env;

export default {
  ENV: NODE_ENV,
  DB_NAME,
  DB_PASSWORD,
  DB_HOST,
  DB_USERNAME,
  DB_PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  PORT,
};
