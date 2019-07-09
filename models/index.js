import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
import configs from '../config'; // Importing configuration file

require('dotenv').config(); // Enabling the use of the env variables

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // We use either NODE_ENV/ 'development'
const config = configs[env]; // Config variable takes in our new configuration
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
