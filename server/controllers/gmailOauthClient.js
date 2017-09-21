const google = require('googleapis');
const clientSecret = require('../client_secret.json').web;
const accessToken = require('../access_token.json');

// const oauth2Client = require('./oauthCreator');

// const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;
const gmailOauthClient = new OAuth2(
  clientSecret.client_id,
  clientSecret.client_secret,
  clientSecret.redirect_uris,
);
// gmailOauthClient.credentials = accessToken;
gmailOauthClient.setCredentials(accessToken);
// console.log('original oauth2Client access Token: ', oauth2Client.credentials.access_token);
const gmail = google.gmail({ auth: gmailOauthClient, version: 'v1' });
const messages = [];
const threads = [];

gmail.users.messages.list({
  userId: 'test.zero0001@gmail.com',
}, (err, results) => {
  for (let i = 0; i < results.length; i += 1) {
    messages.push(results);
  }
  console.log(err ? console.log(err) : console.log('message.list:      ', results.messages));
});
gmail.users.threads.list({ userId: 'test.zero0001@gmail.com' }, (err, response) => {
  for (let i = 0; i < response.length; i += 1) {
    threads.push(response);
  }
  console.log(err ? console.log(err) : console.log('message.list:      ', response));
  // if response.threads[i].snippet.match(/[Address was not found]+/gi)
  // {remove from campaign}
});

// console.log(emails, 'these are the emails');
// set auth as a global default
google.options({
  auth: gmailOauthClient,
});

module.exports = { gmailOauthClient, messages, threads };

/*
  this oauth to client has a certifcateCache field for our current session
  where as the one we have been using does not
  we may want to switch to use this one instead depending on what we are trying to do
*/
