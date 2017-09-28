const models = require('./../dbmodels/dbmodels.js');
const nodemailer = require('nodemailer');
const sendEmail = require('./sendEmail.js');
const buildMessages = require('./buildMessage.js');
const GoogleAuth = require('google-auth-library');
const secret = require('../client_secret.json');

const clientSecret = secret.web.client_secret;
const clientId = secret.web.client_id;
const redirectUrl = secret.web.redirect_uris[0];
const auth = new GoogleAuth();
const transporter = {};

transporter.refresh = (emailSet) => {
  // utilize users refresh token to grab new access token from Google
  const newTransport = auth.UserRefreshClient(clientId,
    clientSecret,
    emailSet[1].gmail_refresh_token);
  newTransport._refreshToken = emailSet[1].gmail_refresh_token;
  const oauth2Client = new newTransport.OAuth2(clientId, clientSecret, redirectUrl);
  oauth2Client.credentials = { refreshToken: emailSet[1].gmail_refresh_token };
  oauth2Client.refreshToken(emailSet[1].gmail_refresh_token, (err, result, response) => {
    if (err) console.log(`Something went wrong when refreshing access token: ${err}`);
    if (result) {
      // update users database record with new access token
      models.users.update({
        gmail_access_token: result.access_token,
      },
      {
        where: { user_id: emailSet[1].user_id },
      },
      )
        .then(() => {
          emailSet[1].gmail_access_token = result.access_token;
          // send back to build with new access token to rebuild mailer object
          transporter.build(emailSet);
        })
        .catch((error) => {
          console.log(`Something went wrong when updating user record with new accessToken: ${error}`);
        });
    }
  });
};

transporter.build = (emailSet) => {
  // build transporter object with users credentials
  const mailer = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    requireTLS: true,
    auth: {
      type: 'OAuth2',
      user: emailSet[1].user_email,
      accessToken: emailSet[1].gmail_access_token,
      refreshToken: emailSet[1].gmail_refresh_token,
    },
  });
  // verify credentials are valid before being sent
  mailer.verify()
    .then(() => {
      // credentials are valid => sending to next function to have all emails built for user
      buildMessages(emailSet, mailer);
    })
    .catch((err) => {
      console.log(`Transporter verfication unsuccessful for ${emailSet[1].user_email}: ${err}`);
      // credentials are invalid => use refresh token to grab new access token
      transporter.refresh(emailSet);
    });
};

module.exports = transporter;
