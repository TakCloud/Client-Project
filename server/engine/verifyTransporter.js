const sendEmail = require('./sendEmail.js');
const grabNewAccessToken = require('./grabNewAccessToken.js');

module.exports = (email, mailer, message, user, lead) => {
  // verify that users access token is still valid before sending
  mailer.verify()
    .then(() => {
      console.log('verified email');
      sendEmail(email, mailer, message, user, lead);
    })
    .catch((err) => {
      console.log(`Transporter verfication unsuccessful: ${err}`);
      // use refresh token to grab new access token
      grabNewAccessToken(email, mailer, message, user, lead);
    });
};
