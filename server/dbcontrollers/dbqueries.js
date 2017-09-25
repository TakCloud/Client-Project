const models = require('./../dbmodels/dbmodels.js');
const transporter = require('../controllers/transporter');
const oauth2Client = require('../controllers/OauthSenderController');

const dbqueries = {};

const newToken = (req, res, next) => {
  console.log('req.query.cod', req.query.code);
  if (transporter) {
    transporter.verify((err, success) => {
      if (err) {
        console.log('Error:   Token cannot be used to authenticate!');
        oauth2Client.getToken(req.query.code, (errr, token) => {
          if (errr) {
            console.log('Error while trying to retrieve access token w/current CODE: ', errr);
            // we need logic here to use the refresh token if access is not valid with access token
          }
          if (token) {
            console.log('this is the token : ', token);
            oauth2Client.credentials = token;
            res.locals.token = Object.create(null);
            res.locals.token.gmail_access_token = token.access_token;
            if (token.refresh_token) {
              res.locals.token.gmail_refresh_token = token.refresh_token;
            }
            console.log(`Token accessed w/new req.query.code, stored on oaut2Client.credentials: ${JSON.stringify(token)}`);
            next();
          }
        });
      }
      if (success) {
        console.log('transporter still connected with current accessToken \n');
        next();
      }
    });
  }
};

dbqueries.grabTokens = (req, res, next) => {
  models.users.find({
    where: { user_id: req.body.user_id },
    attributes: ['user_id', 'gmail_access_token', 'gmail_refresh_token'],
  })
    .then((entry) => {
      console.log(entry.dataValues, 'this entry');
      if (entry.dataValues.gmail_access_token === null) newToken(req, res, next);
      else {
        res.locals.token = entry.dataValues;
        next();
      }
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
