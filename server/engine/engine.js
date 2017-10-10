const models = require('./../dbmodels/dbmodels.js');
const buildTransport = require('./buildTransport.js');

const engine = {};

const mailEngine = () => {
  // find all pending emails in database that are past due 
  models.emails.findAll({
    where: {
      status: 'pending',
      $and: { send_at: { $lt: Date.now() } },
    },
    include: [{
      model: models.users,
      attributes: ['user_id', 'user_email', 'gmail_access_token', 'gmail_refresh_token'],
    },
    {
      model: models.leads,
      attributes: ['lead_id', 'lead_first_name', 'lead_last_name', 'lead_email'],
    }],
  })
    .then((entries) => {
      // restructure entries format to make building/sending emails easier
      const hoistedUsers = entries.reduce((acc, email) => {
        const pushToData = () => {
          acc[email.dataValues.from_user_id].emails.push(Object.assign({}, {
            email_id: email.dataValues.email_id,
            lead_group_id: email.dataValues.lead_group_id,
            step_number: email.dataValues.step_number,
            gmail_message_id: email.dataValues.gmail_message_id,
            subject: email.dataValues.subject,
            body: email.dataValues.body,
            template_id: email.dataValues.template_id,
            status: email.dataValues.status,
            status_last_updated: email.dataValues.status_last_updated,
            sent_time: email.dataValues.sent_time,
            send_at: email.dataValues.send_at,
            campaign_id: email.dataValues.campaign_id,
            lead: Object.assign({}, {
              lead_id: email.dataValues.lead.dataValues.lead_id,
              lead_first_name: email.dataValues.lead.dataValues.lead_first_name,
              lead_last_name: email.dataValues.lead.dataValues.lead_last_name,
              lead_email: email.dataValues.lead.dataValues.lead_email,
            }),
          }));
        };
        if (!acc[email.dataValues.from_user_id]) {
          acc[email.dataValues.from_user_id] = email.dataValues.user.dataValues;
          acc[email.dataValues.from_user_id].emails = [];
          pushToData();
        } else {
          pushToData();
        }

        return acc;
      }, {});
      const toBeSent = Object.entries(hoistedUsers);
      // send each entry to have nodemailer transporter built for given user
      toBeSent.forEach((emailSet) => {
        buildTransport.build(emailSet);
      });
    })
    .catch((err) => {
      console.log(`Something went wrong when polling: ${err}`);
    });
};

// run engine at set interval of time (ex. every 30 mins);
engine.begin = () => {
  // adjust timeout to desired testing interval
  setInterval(mailEngine, 3000);
};

module.exports = engine;
