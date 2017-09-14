const fs = require('fs');
const oauth2Client = require('./oauthCreator').oauth2Client;

module.exports = (req, res, next) => {
  // res.locals which can now be used to set the appCode and oauth2Client function in tokenFiler.js
  // appCode is then sent to front end to fed to oauth2Client function later on a different route
  const TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE)}/credentials/`;
  const TOKEN_PATH = `${TOKEN_DIR} gmail.json`;

  //  Store token to disk be used in later program executions.
  const storeToken = (token) => {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), () => {
      console.log(`Token stored to ${TOKEN_PATH}`);
      next();
    });
  };
  oauth2Client.getToken(res.locals.code, (err, token) => {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      oauth2Client.isSignedIn()
      return;
    }
    //  Left in oauth2Client.credentials for quicker queries for
    //  whether a users access_token is stored within our database
    oauth2Client.credentials = token;
    storeToken(token);
  });
};
