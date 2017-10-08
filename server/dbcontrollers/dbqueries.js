const models = require('./../dbmodels/dbmodels.js');

const dbqueries = {};

dbqueries.grabTokens = (req, res) => {
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
  models.users.findAll({
    attributes: ['user_id', 'user_email'],
    where: { user_id: res.locals.user_id }, // replace with res.locals.user_id
    include: [{
      attributes: ['campaign_id', 'campaign_name', 'lead_groups', 'current_step'],
      model: models.campaigns,
      include: [{
        attributes: ['step_id', 'step_number', 'time_interval', 'template_id'],
        model: models.campaign_steps,
        include: [models.templates],
      }],
    }],
  })
    .then((users) => {
      res.locals.databaseEntry = users.map((user) => {
        return Object.assign({},
          {
            user_id: user.user_id,
            user_email: user.user_email,
            campaigns: user.campaigns.map((campaign) => {
              return Object.assign({},
                {
                  campaign_id: campaign.campaign_id,
                  campaign_name: campaign.campaign_name,
                  status: campaign.campaign_status,
                  lead_groups: campaign.lead_groups,
                  current_step: campaign.current_step,
                  start_date: campaign.campaign_start_date,
                  campaign_steps: campaign.campaign_steps.map((step) => {
                    return Object.assign({}, {
                      step_id: step.step_id,
                      step_number: step.step_number,
                      time_interval: step.time_interval,
                      template: {
                        template_id: step.template.template_id,
                        template_name: step.template.template_name,
                        subject: step.template.subject,
                        body: step.template.body,
                      },
                    });
                  }),
                });
            }),
          });
      });
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = dbqueries;
