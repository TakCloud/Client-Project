const google = require('googleapis');
const clientSecret = require('../client_secret.json').web;
const accessToken = require('../access_token.json');
const models = require('../dbmodels/dbmodels');

console.log(clientSecret.client_id);
const OAuth2 = google.auth.OAuth2;
const gmailOauthClient =
new OAuth2(clientSecret.client_id, clientSecret.client_secret, clientSecret.redirect_uris);
google.options({
  auth: gmailOauthClient,
});
module.exports = (req, res, next) => {
  let user;
  const messages = [];
  models.users.find({
    // where: { firstname: req.body.user_id },
    where: { firstname: 'JON' },
    attributes: ['gmail_access_token'],
  })
    .then((entry) => {
      user = entry.dataValues;
      console.log('hello', user);
      gmailOauthClient.setCredentials(accessToken);
      // originaloauth2Client.credentials.access_token can be referenced to ensure
      // that the gmailOauth controller has same token as Original Oauth2Controller
      const gmail = google.gmail({ auth: gmailOauthClient, version: 'v1' });
      res.locals.gmail = gmail;
      gmail.users.messages.list({ userId: user, includeSpamTrash: true }, (err, results) => {
        if (err) {
          console.log('there was an error');
          next();
        }
        if (results) {
          for (let i = 0; i < results.messages.length; i += 1) {
            console.log('hellllloooo', results);
            messages.push(results.messages[i]);
          }
          // console.log('MY MESSAGESLENGTH: ', messages.length);
          console.log('MY MESSAGES: ', messages);
          next();
        }
      });
    });
  next();
};
