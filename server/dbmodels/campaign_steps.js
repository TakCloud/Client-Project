const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const CampaignSteps = sequelize.define('campaign_steps', {
  step_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  campaign_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'campaigns',
      key: 'campaign_id',
    },
  },
  step_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  template_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'templates',
      key: 'template_id',
    },
  },
  time_interval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  created_at_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  last_updated: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  last_updated_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
  deleted_by_user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
}, {
  freezeTableName: true,
  tableName: 'campaign_steps',
  timestamps: false,
});


module.exports = () => CampaignSteps;
