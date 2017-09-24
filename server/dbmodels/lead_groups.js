const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const LeadGroups = sequelize.define('lead_groups', {
  lead_group_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  lead_group_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
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
  tableName: 'lead_groups',
  timestamps: false,
});


module.exports = () => LeadGroups;
