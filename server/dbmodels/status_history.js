const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const StatusHistory = sequelize.define('status_history', {
  email_history_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  sent_email_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'emails',
      key: 'email_id',
    },
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_updated: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: 'status_history',
  timestamps: false,
});


module.exports = () => StatusHistory;
