const oauth2Client = require('./oauthCreator').oauth2Client;
const url = require('./oauthCreator').url;
const token = require('../access_token.json');

module.exports = (req, res, next) => {
  console.log('This token was passed to the front end: ', token);
  res.locals.authUrl = url;
  oauth2Client.credentials = token;
  next();
};
