const updateEmailRecord = require('./updateEmailRecord.js');

module.exports = (email, mailer, message) => {
  // console.log('look at this: ', message);
  mailer.sendMail(message)
    .then(() => {
      console.log(`Email sent to: ${email.lead.lead_email}`);
      // after sending, the email record needs to be updated in the database
      // so the engine doesn't pull it again
      updateEmailRecord(email, message);
    })
    .catch((err) => {
      console.log(`Something went wrong when sending mail: ${err}`);
    });
};
