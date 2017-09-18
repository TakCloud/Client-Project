// creates connection to database
const Sequelize = require('sequelize');

module.exports = new Sequelize('postgres://rawnwiga:KmvRb_bLjALCFuJ5-rf1QXx_qY0ywtYm@babar.elephantsql.com:5432/rawnwiga', {
  dialect: 'postgres',
});
