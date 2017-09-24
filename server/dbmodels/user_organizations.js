const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const UserOrganizations = sequelize.define('user_organizations', {
  organization_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  organization_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  primary_contact_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: 'user_organizations',
  timestamps: false,
  underscored: true,
});


module.exports = () => UserOrganizations;
