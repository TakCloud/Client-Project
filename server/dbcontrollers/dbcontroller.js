// const Sequelize = require('sequelize');
const models = require('./../dbmodels/dbmodels.js'); // will be using to insert/read data
const sequelize = require('./sequelize_instance.js');

// tests connection
sequelize.authenticate()
  .then(() => {
    console.log('Success!');
  }).catch((err) => {
    console.log(err);
  });
