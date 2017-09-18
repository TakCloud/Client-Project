const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const MergeCodes = sequelize.define('merge_codes', {
  merge_code_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  merge_code: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  map: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: 'merge_codes',
  timestamps: false,
});


module.exports = () => MergeCodes;
