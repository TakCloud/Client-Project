const google = require('googleapis');
const clientSecret = require('../client_secret.json').web;
const accessToken = require('../access_token.json');

// const oauth2Client = require('./oauthCreator');

const OAuth2 = google.auth.OAuth2;
const gmailOauthClient =
new OAuth2(clientSecret.client_id, clientSecret.client_secret, clientSecret.redirect_uris);
google.options({
  auth: gmailOauthClient,
});
// gmailOauthClient.credentials = accessToken;
gmailOauthClient.setCredentials(accessToken);
// console.log('original oauth2Client access Token: ', oauth2Client.credentials.access_token);
const gmail = google.gmail({ auth: gmailOauthClient, version: 'v1' });


module.exports = gmail;

/*
  this oauth to client has a certifcateCache field for our current session
  where as the one we have been using does not
  we may want to switch to use this one instead depending on what we are trying to do
*/
