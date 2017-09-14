const oauth2Client = require('./oauthCreator').oauth2Client;
const url = require('./oauthCreator').url;
const token = require('../access_token.json');

module.exports = (req, res, next) => {
  //  response is sending the authURL to the frontend so that
  //  the front end can call window.location on the authURL
  res.locals.authUrl = url;
  console.log(token, 'this is the token');
  oauth2Client.credentials = token;
  next();
};
