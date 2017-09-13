const fs = require('fs');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const path = require('path');
const accessToken = require('../access_token.json').token;
module.exports = (req,res,next) => {
  const SCOPES = ['https://mail.google.com/'];
  const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/credentials/';
  const TOKEN_PATH = TOKEN_DIR + 'gmail.json';
  // res.locals which can now be used to set the appCode and oauth2Client function in tokenFiler.js
  // appCode is now fed to oauth2Client function
  oauth2Client = res.locals.oauth2Client;
  oauth2Client.getToken(res.locals.code, (err, token) => {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    oauth2Client.credentials = token;
    return storeToken(token);
  });

//Store token to disk be used in later program executions.
  const storeToken = (token) => {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), () => {
      res.locals.token = JSON.stringify(token);
      console.log('Token stored to ' + TOKEN_PATH);
      next();
    });
  };
};