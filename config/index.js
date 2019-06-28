import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    DATABASE_URL: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  },
  test: {
    DATABASE_URL: 'DATABASE_TEST',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    DATABASE_URL: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};
