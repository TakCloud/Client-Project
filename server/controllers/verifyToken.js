const oauth2Client = require('./OauthSenderController');

module.exports = (req, res, next) => {
  if (req.query) {
    console.log('fiawehflaiefjaowf', req.query.code);
    oauth2Client.getToken(req.query.code, (errr, token) => {
      if (errr) {
        console.log('Error while trying to retrieve access token w/current CODE: ', errr);
        // we may need to include logic here to try and grab access Token w/ Refresh
      }
      if (token) {
        oauth2Client.credentials = token;
        res.locals.token = token;
        console.log(`Token accessed w/new req.query.code, stored on oaut2Client.credentials: ${JSON.stringify(token)}`);
        next();
      }
    });
  } else next();
};
