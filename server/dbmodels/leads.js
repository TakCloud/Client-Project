const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const Leads = sequelize.define('leads', {
  lead_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  lead_first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lead_last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lead_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  eligible_to_email: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  number_of_sent: { type: Sequelize.INTEGER },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  last_updated: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
}, {
  freezeTableName: true,
  tableName: 'leads',
  timestamps: false,
});


module.exports = () => Leads;
