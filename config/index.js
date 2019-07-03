const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    use_env_variable: 'DATABASE_TEST',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
  email: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
  secret_key_code: process.env.SECRET_KEY_CODE,
};
