const models = require('./../dbmodels/dbmodels.js');

const dbqueries = {};

dbqueries.grabTokens = (req, res, next) => {
  models.users.find({
    where: { user_id: req.body.user_id },
    attributes: ['user_id', 'gmail_access_token', 'gmail_refresh_token'],
  })
    .then((entry) => {
      res.locals.currTokens = entry;
      console.log(res.locals.currTokens);
    });
};

module.exports = dbqueries;
