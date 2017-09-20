const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const Emails = sequelize.define('emails', {
  email_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  lead_group_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'lead_groups',
      key: 'lead_group_id',
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
  step_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lead_email: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'leads',
      key: 'lead_email',
    },
  },
  from_email: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'send_as_email',
    },
  },
  gmail_message_id: { type: Sequelize.STRING },
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  template_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'templates',
      key: 'template_id',
    },
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
  },
  status_last_updated: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  sent_by_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  sent_time: { type: Sequelize.DATE },
}, {
  freezeTableName: true,
  tableName: 'emails',
  timestamps: false,
});


module.exports = () => Emails;
