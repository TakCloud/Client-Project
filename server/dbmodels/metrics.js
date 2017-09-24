const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const Metrics = sequelize.define('metrics', {
  metric_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  organization_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user_organizations',
      key: 'organization_id',
    },
  },
  campaign_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'campaigns',
      key: 'campaign_id',
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  step_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'campaign_steps',
      key: 'step_id',
    },
  },
  template_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'templates',
      key: 'template_id',
    },
  },
  total_emails_sent: { type: Sequelize.INTEGER },
  deliverd: { type: Sequelize.INTEGER },
  opened: { type: Sequelize.INTEGER },
  clicked: { type: Sequelize.INTEGER },
  responded: { type: Sequelize.INTEGER },
  soft_bounced: { type: Sequelize.INTEGER },
  hard_bounced: { type: Sequelize.INTEGER },
}, {
  freezeTableName: true,
  tableName: 'metrics',
  timestamps: false,
  indexes: [{
    fields: ['campaign_id', 'user_id', 'step_id', 'template_id'],
  }],
});


module.exports = () => Metrics;
