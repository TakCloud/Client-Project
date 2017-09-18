const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const LeadGroups = sequelize.define('lead_groups', {
  lead_group_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  lead_group_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  primary_ciontact_emal: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
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
  tableName: 'lead_groups',
  timestamps: false,
});


module.exports = () => LeadGroups;
