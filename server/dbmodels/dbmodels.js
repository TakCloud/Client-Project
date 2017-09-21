const path = require('path');
const sequelize = require('./../dbcontrollers/sequelize_instance.js');

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
// export all models to be used in controller files
models.forEach((model) => {
  module.exports[model] = sequelize.import(path.join(__dirname, `/${model}`));
});
