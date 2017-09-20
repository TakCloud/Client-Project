const GoogleAuth = require('google-auth-library');
const secret = require('../client_secret.json');

const clientSecret = secret.web.client_secret;
const clientId = secret.web.client_id;
const redirectUrl = secret.web.redirect_uris[0];
const auth = new GoogleAuth();
const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
module.exports = {
  oauth2Client,
  url: 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=597535892558-d9oqu99oosrel4fkcuabjv2kf6qpmf2j.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsummary',
};
