const models = require('./../dbmodels/dbmodels.js');

const dbqueries = {};

dbqueries.grabTokens = (req, res, next) => {
  models.users.find({
    where: { user_id: req.body.user_id },
    attributes: ['user_id', 'gmail_access_token', 'gmail_refresh_token'],
  })
    .then((entry) => {
      res.locals.currTokens = entry;
      console.log(res.locals.currTokens);
    });
};

dbqueries.grabState = (req, res, next) => {

};

module.exports = dbqueries;

/* 
  {
    user: {
      id: 1,
      email: '1@example.com',
    },
    campaigns: [{
      campaign_id: 1,
      campaign_name: 'campaign1',
      status: 'active',
      lead_groups: [1, 2],
      campaign_steps: [{
        step_number: 1,
        time_interval: timestamp,
        template: {
          id: 1,
          name: 'template1',
          subject: 'subject here',
          body: 'body here',
        }
      },
      {
        step_number: 2,
        time_interval: timestamp,
        template: {
          id: 2,
          name: 'template2',
          subject: 'subject here',
          body: 'body here',
        }
      }],
      start_date: timestamp,
      campaign_metrics: { ...metrics },
    },
    {
      campaign_id: 2,
      campaign_name: 'campaign2',
      status: 'disabled',
      lead_groups: [3, 4],
      campaign_steps: [{
        step_number: 1,
        time_interval: timestamp,
        template: {
          id: 1,
          name: 'template1',
          subject: 'subject here',
          body: 'body here',
        }
      },
      {
        step_number: 2,
        time_interval: timestamp,
        template: {
          id: 2,
          name: 'template2',
          subject: 'subject here',
          body: 'body here',
        }
      }],
      start_date: timestamp,
      campaign_metrics: { ...metrics },
    }],
    lead_groups: [{
      lead_group_id: 1,
      lead_group_name: 'group1',
    },
    {
      lead_group_id: 2,
      lead_group_name: 'group2',
    }]
    total_metrics: { ...metrics },
  }
*/
