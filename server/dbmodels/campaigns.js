const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const Campaigns = sequelize.define('campaigns', {
  campaign_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  campaign_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lead_groups: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  current_step: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
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
  tableName: 'campaigns',
  timestamps: false,
  underscored: true,
});


module.exports = () => Campaigns;
