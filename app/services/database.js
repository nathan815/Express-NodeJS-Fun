const config = require('./../config');
const Sequelize = require('sequelize');

const db = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;