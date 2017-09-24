const oauth2Client = require('./oauthCreator');
const refresh = require('../access_token').refresh_token;
const transporter = require('./transporter');
const accessToken = require('../access_token.json');

module.exports = (req, res, next) => {
  if (transporter) {
    transporter.verify((err, success) => {
      if (err) {
        console.log('Error: Token cannot be used to authenticate!', JSON.parse(JSON.stringify(accessToken)));
        oauth2Client.getToken(req.query.code, (errr, token) => {
          if (errr) {
            console.log('Error while trying to retrieve access token w/current CODE: ', errr);
            oauth2Client.getToken(refresh, (error, newToken) => {
              if (error) console.log('Error2 while trying to retrieve access token w/refresh_token: ', error);
              oauth2Client.credentials = newToken;
              res.locals.token = newToken;
              next();
              console.log(`Token accessed w/refresh_token stored on oaut2Client.credentials: ${JSON.stringify(newToken)}`);
            });
          }
          if (token) { //  change back!! we only want to store if !token.refresh_token 
            oauth2Client.credentials = token;
            res.locals.token = token;
            next();
            console.log(`Token accessed w/new req.query.code, stored on oaut2Client.credentials: ${JSON.stringify(token)}`);
          }
        });
      }
      if (success) {
        console.log('transporter still connected with current accessToken', accessToken.access_token, '\n');
        res.send();
      }
    });
  } else {
    res.send();
  }
};
