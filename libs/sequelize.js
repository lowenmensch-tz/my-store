const { Sequelize } = require('sequelize');
const setupModels = require('./../db/models');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

console.log( URI );

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (msg) =>console.log(msg)
});

setupModels(sequelize);

module.exports = sequelize;
