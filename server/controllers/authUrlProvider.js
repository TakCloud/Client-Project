const oauth2Client = require('./oauthCreator').oauth2Client;
const url = require('./oauthCreator').url;
let token = require('../access_token.json');
// const accessToken = require('../access_token.json').token;

module.exports = (req, res, next) => {
  res.locals.authUrl = url;
  token = JSON.stringify(token);
  console.log(token, 'this is the token');
  oauth2Client.credentials = JSON.parse(token);
  console.log(oauth2Client.credentials, 'these are authUrlProviders oauth2Client.credentials');
  next();
};
