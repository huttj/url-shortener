import Sequelize from 'sequelize';
import db        from './db';

const Url = db.define('url', {
  url       : {
    type   : Sequelize.STRING,
    unique : true
  },
  shortUrl  : Sequelize.STRING,
  createdBy : Sequelize.STRING,
  clicks    : Sequelize.STRING
});

Url.sync();

export default Url;