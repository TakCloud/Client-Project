const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const path = require('path');
const accessToken = require('../access_token.json').token;

module.exports = (req,res,next) => {
  
  const SCOPES = ['https://mail.google.com/'];
  const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/credentials/';
  const TOKEN_PATH = TOKEN_DIR + 'gmail.json';
  const processClientSecrets = (err, content) => {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    authorize(JSON.parse(content));
  }
  // Load client secrets from a local file.
  fs.readFile(path.join(__dirname, '../client_secret.json'), processClientSecrets);
  

  // Create an OAuth2 client with the given credentials
  const authorize = (credentials) => {
    console.log('these are credentials ', credentials);
    const clientSecret = credentials.web.client_secret;
    const clientId = credentials.web.client_id;
    const redirectUrl = credentials.web.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    res.locals.oauth2Client = oauth2Client;
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        getNewToken(oauth2Client);
      } else {
        oauth2Client.credentials = JSON.parse(token);
      };
    });
  };

  //  Get and store new token after prompting for user authorization
  const getNewToken = (oauth2Client) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    res.locals.authUrl = authUrl;
    next();
  };
 };
