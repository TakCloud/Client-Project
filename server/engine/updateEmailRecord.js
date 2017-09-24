const models = require('./../dbmodels/dbmodels.js');

module.exports = (email, message) => {
  // update email record so engine doesn't grab it again
  // message parameter will be used at a later time for inserting gmail message id
  models.emails.update({
    status: 'sent',
    sent_time: Date.now(),
    gmail_message_id: 'insert message id here',
  },
  { where: { email_id: email.email_id } })
    .catch((err) => {
      console.log(`Something went wrong when updating email record: ${err}`);
    });
};
