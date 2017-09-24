const models = require('./../dbmodels/dbmodels.js');
const generateCampaign = require('./dbcampaigngen');

const dbcontroller = {};

// ***** WILL WIPE OUT DATABASE IF UNCOMMENTED *****
// const sequelize = require('./../dbcontrollers/sequelize_instance.js');
// sequelize.sync({ force: true }); 

// grab table name based on post request endpoint
const getTableName = (path) => {
  switch (path) {
    case '/createorg':
      return 'user_organizations';
    case '/createuser':
      return 'users';
    case '/createleadgroup':
      return 'lead_groups';
    case '/createleads':
      return 'leads';
    case '/createtemplate':
      return 'templates';
    default:
      return 'Table does not exist';
  }
};

// determine what columns from DB records we're allowed to send back to the client
const whitelist = [
  'organization_id',
  'user_id',
  'campaign_id',
  'template_id',
  'lead_group_id',
  'lead_id',
  'lead_email',
  'merge_code_id',
  'metric_id',
  'sent_email_id',
  'email_history_id',
];

// insert single record into database
dbcontroller.insert = (req, res, next) => {
  const table = getTableName(req.route.path);
  models[table].create(req.body)
    .then((entry) => {
      // only return whitelisted properties
      const entryArr = Object.entries(entry.dataValues).reduce((acc, el) => {
        if (whitelist.includes(el[0])) acc[el[0]] = el[1];
        return acc;
      }, {});
      res.locals.databaseEntry = entryArr;
      next();
    })
    .catch((err) => {
      res.status(400).json(`Something went wrong when inserting data: ${err}`);
    });
};

// bulk insert records into database
dbcontroller.bulkInsert = (req, res, next) => {
  const table = getTableName(req.route.path);
  models[table].bulkCreate(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json(`Something went wrong on bulk insert: ${err}`);
    });
};

// insert campaign details into all relevant db tables
dbcontroller.generateCampaign = generateCampaign;

module.exports = dbcontroller;
