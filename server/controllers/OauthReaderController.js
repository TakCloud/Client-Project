const google = require('googleapis');
const clientSecret = require('../client_secret.json').web;
const accessToken = require('../access_token.json');

console.log(clientSecret.client_id);
const OAuth2 = google.auth.OAuth2;
const gmailOauthClient =
new OAuth2(clientSecret.client_id, clientSecret.client_secret, clientSecret.redirect_uris);
google.options({
  auth: gmailOauthClient,
});
// gmailOauthClient.setCredentials(accessToken);
gmailOauthClient.setCredentials({
  access_token: accessToken.accessToken,
  refresh_token: accessToken.refreshToken,
  // Optional, provide an expiry_date (milliseconds since the Unix Epoch)
  // expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
});
// originaloauth2Client.credentials.access_token can be referenced to ensure
// that the gmailOauth controller has same token as Original Oauth2Controller
const gmail = google.gmail({ auth: gmailOauthClient, version: 'v1' });

module.exports = gmail;
