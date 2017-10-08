const models = require('./../dbmodels/dbmodels.js');
// const verifyTransporter = require('./verifyTransporter.js');
const sendMail = require('./sendEmail.js');

module.exports = (emailSet, mailer) => {
  // run loop to build each email and send
  emailSet[1].emails.forEach((email) => {
    const message = {
      envelope: {
        from: emailSet[1].user_email,
        to: email.lead.lead_email,
        dsn: {
          id: 'some random message specific id',
          return: 'headers',
          notify: ['failure', 'delay', 'success'],
          recipient: emailSet[1].user_email,
        },
      },
      subject: email.subject,
      html: `<b><img src="https://cheatcodes5.herokuapp.com/summary/imageTracker?thisPersonOpenedEmail=${email.lead.lead_email}"/></b>`,
      text: email.body,
    };
    // send each email after being built
    sendMail(email, mailer, message);
  });
};

