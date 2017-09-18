const Sequelize = require('sequelize');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const Leads = sequelize.define('leads', {
  lead_id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  lead_first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lead_last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lead_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  lead_group_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'lead_groups',
      key: 'lead_group_id',
    },
  },
  eligible_to_email: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  number_of_sent: { type: Sequelize.INTEGER },
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
  tableName: 'leads',
  timestamps: false,
});


module.exports = () => Leads;
