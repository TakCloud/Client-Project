const models = require('./../dbmodels/dbmodels.js');

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

dbcontroller.generateCampaign = (req, res, next) => {
  // inserts one email per lead per campaign into emails table
  const insertEmails = () => {
    req.body.steps.forEach((step) => {
      res.locals.leads.forEach((lead) => {
        models.emails.create({
          lead_group_id: req.body.lead_group,
          campaign_id: res.locals.campaign.campaign_id,
          step_number: step.step_number,
          lead_email: lead.lead_email,
          from_email: res.locals.user.user_email,
          subject: step.template.subject,
          body: step.template.body,
          template_id: 1, // just testing
          sent_by_user_id: res.locals.user.user_id,
        })
          .catch((err) => {
            res.status(400).json(`Something went wrong when inserting emails: ${err}`);
          });
      });
    });
    next();
  };
  // inserts campaign steps into campaign_steps table
  const insertSteps = () => {
    req.body.steps.forEach((step) => {
      models.campaign_steps.create({
        campaign_id: res.locals.campaign.campaign_id,
        step_number: step.step_number,
        template_id: 1, // just testing
        time_interval: step.time_interval,
        created_at_user_id: res.locals.user.user_id,
        last_updated_user_id: res.locals.user.user_id,
      }).catch((err) => {
        res.status(400).json(`Something went wrong when inserting steps: ${err}`);
      });
    });
    insertEmails();
  };
  // inserts campaign into campaigns table
  const insertCampaign = () => {
    models.campaigns.create({
      campaign_name: req.body.campaign_name,
      status: 'active',
      lead_groups: req.body.lead_group,
      created_at_user_id: req.body.user_id,
      last_updated_user_id: req.body.user_id,
    })
      .then((entry) => {
        res.locals.campaign = entry;
        insertSteps();
      });
  };
  // grab all referenced data from DB before attempting inserts
  const grabData = () => {
    models.users.find({
      where: { user_id: req.body.user_id },
      attributes: ['user_id', 'user_email', 'user_first_name', 'user_last_name', 'reply_to_email'],
    })
      .then((entry) => {
        res.locals.user = entry.dataValues;
        models.leads.findAll({
          where: { lead_group_id: req.body.lead_group },
          attributes: ['lead_first_name', 'lead_last_name', 'lead_email', 'lead_group_id', 'lead_id'],
        })
          .then((entries) => {
            res.locals.leads = entries;
            // begin inserts
            insertCampaign();
          })
          .catch((err) => {
            res.status(400).json(`Something went wrong when grabbing data: ${err}`);
          });
      });
  };

  grabData();
};

module.exports = dbcontroller;
