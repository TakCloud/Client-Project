const path = require('path');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

const db = {};

const models = ['campaign_steps',
  'campaigns',
  'lead_groups',
  'leads',
  'merge_codes',
  'metrics',
  'emails',
  'status_history',
  'templates',
  'user_organizations',
  'users'];

// assign all models to db object to be exported
models.forEach((model) => {
  db[model] = sequelize.import(path.join(__dirname, `/${model}`));
});

// establish table relations (foreign keys) so sequelize is aware of them
db.users.belongsTo(db.user_organizations, { foreignKey: 'user_organization_id' });
db.users.hasMany(db.campaigns, { foreignKey: 'user_id' });
db.campaigns.hasMany(db.campaign_steps, { foreignKey: 'campaign_id' });
db.campaigns.belongsTo(db.users, { foreignKey: 'created_by_user_id' });
db.campaigns.belongsTo(db.users, { foreignKey: 'last_updated_user_id' });
db.campaigns.belongsTo(db.users, { foreignKey: 'deleted_by_user_id' });
db.campaign_steps.belongsTo(db.campaigns, { foreignKey: 'campaign_id' });
db.campaign_steps.belongsTo(db.users, { foreignKey: 'created_by_user_id' });
db.campaign_steps.belongsTo(db.users, { foreignKey: 'last_updated_user_id' });
db.campaign_steps.belongsTo(db.users, { foreignKey: 'deleted_by_user_id' });
db.campaign_steps.belongsTo(db.templates, { foreignKey: 'template_id' });
db.lead_groups.belongsTo(db.users, { foreignKey: 'created_by_user_id' });
db.lead_groups.belongsTo(db.users, { foreignKey: 'last_updated_user_id' });
db.lead_groups.belongsTo(db.users, { foreignKey: 'deleted_by_user_id' });
db.leads.belongsTo(db.lead_groups, { foreignKey: 'lead_group_id' });
db.leads.belongsTo(db.users, { foreignKey: 'created_by_user_id' });
db.leads.belongsTo(db.users, { foreignKey: 'last_updated_user_id' });
db.leads.belongsTo(db.users, { foreignKey: 'deleted_by_user_id' });
db.emails.belongsTo(db.campaigns, { foreignKey: 'campaign_id' });
db.emails.belongsTo(db.leads, { foreignKey: 'lead_id' });
db.emails.belongsTo(db.users, { foreignKey: 'from_user_id' });
db.emails.belongsTo(db.users, { foreignKey: 'sent_by_user_id' });


module.exports = db;
