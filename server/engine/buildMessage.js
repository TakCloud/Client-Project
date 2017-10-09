const models = require('./../dbmodels/dbmodels.js');
const verifyTransporter = require('./verifyTransporter.js');

module.exports = (emailSet, mailer, user) => {
  // run loop to build each email and send
  emailSet.forEach((email) => {
    models.leads.find({
      where: { lead_id: email.lead_id },
      attributes: ['lead_id', 'lead_first_name', 'lead_last_name', 'lead_email'],
    })
      .then((leadRecord) => {
        const lead = leadRecord.dataValues;
        const message = {
          envelope: {
            from: user.user_email,
            to: lead.lead_email,
            dsn: {
              id: 'some random message specific id',
              return: 'headers',
              notify: ['failure', 'delay', 'success'],
              recipient: user.user_email,
            },
          },
          subject: email.subject,
          html: `<b><img src="https://codesmithnodejs.azurewebsites.net/summary/imageTracker?thisPersonOpenedEmail=${lead.lead_email}"/></b>`,
          text: email.body,
        };
        // verify that users access token is valid before sending
        verifyTransporter(email, mailer, message, user, lead);
      })
      .catch((err) => {
        console.log(`Something went wrong when grabbing lead: ${err}`);
      });
  });
};
