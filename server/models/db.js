import Sequelize from 'sequelize';

export default new Sequelize('urlshortener', 'root', 'toor', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: './database.sqlite'
});