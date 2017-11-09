const fs = require('fs');
const oauth2Client = require('./oauthCreator');
// const accessToken = require('../access_token.json').token;

module.exports = (req, res, next) => {
  const SCOPES = ['https://mail.google.com/'];
  //  we need to replace the TOKEN_DIR with a field in the database
  const TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE)}/credentials/`;
  const TOKEN_PATH = `${TOKEN_DIR}gmail.json`;
  //  Get and store new token after prompting for user authorization
  const getNewToken = (oauth2ClientFunction) => {
    const authUrl = oauth2ClientFunction.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    res.locals.authUrl = authUrl;
    next();
  };
  // Create an OAuth2 client with the given credentials
  const authorize = () => {
    res.locals.oauth2Client = oauth2Client;
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        getNewToken(oauth2Client);
      } else {
        console.log(token, 'this is the token');
        oauth2Client.credentials = JSON.parse(token);
      }
    });
  };
  authorize();
};
