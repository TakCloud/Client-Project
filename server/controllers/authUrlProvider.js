const oauth2Client = require('./oauthCreator').oauth2Client;
const url = require('./oauthCreator').url;

module.exports = (req, res, next) => {
  console.log('This url was passed to the front end: ', url);
  res.locals.authUrl = url;
  next();
};
