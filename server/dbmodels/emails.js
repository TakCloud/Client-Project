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
  step_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
  sent_time: { type: Sequelize.DATE },
  send_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: 'emails',
  timestamps: false,
});


module.exports = () => Emails;
