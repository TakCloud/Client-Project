const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const SentEmails = sequelize.define('sent_emails', {
  sent_email_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
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
  gmail_message_id: { type: Sequelize.INTEGER },
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
  status: { type: Sequelize.STRING },
  status_last_updated: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  sent_by_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  sent_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: 'sent_emails',
  timestamps: false,
});


module.exports = () => SentEmails;
