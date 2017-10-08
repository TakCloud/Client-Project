const oauth2Client = require('./OauthSenderController');
const mailer = require('../engine/buildTransport');
module.exports = (req, res, next) => {
  oauth2Client.getToken(req.query.code, (errr, token) => {
    if (errr) {
      console.log('Error while trying to retrieve access token w/current CODE: ', errr);
      // we may need to include logic here to try and grab access Token w/ Refresh
    }
    if (token) { //  change back!! we only want to store if !token.refresh_token 
      oauth2Client.credentials = token;
      res.locals.token = token;
      next();
      console.log(`Token accessed w/new req.query.code, stored on oaut2Client.credentials: ${JSON.stringify(token)}`);
    }
  });
};
