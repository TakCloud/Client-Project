const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const Users = sequelize.define('users', {
  user_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_organization_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user_organizations',
      key: 'organization_id',
    },
  },
  user_organization_name: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'user_organizations',
      key: 'organization_name',
    },
  },
  user_first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email_signature: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  send_as_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  reply_to_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  gmail_access_token: {
    type: Sequelize.STRING,
  },
  gmail_refresh_token: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true,
  tableName: 'users',
  timestamps: false,
});

module.exports = () => Users;
