const models = require('./../dbmodels/dbmodels.js');

const dbupdates = {};

dbupdates.saveToken = (req, res, next) => {
  models.users.update({
    gmail_access_token: res.locals.token.access_token,
    gmail_refresh_token: res.locals.token.refresh_token,
  },
  { where: { user_id: req.body.user_id } }
  )
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json(`Something went wrong when saving token to database: ${err}`);
    });
};

dbupdates.removeCampaign = (req, res, next) => {
  if (res.locals.email) {
    console.log('you made it!! ', res.locals);
    models.users.update({
      gmail_access_token: res.locals.token.access_token,
      // email status
      // all emails where lead id = proper lead id and 
      // status is pending 
    },
    { where: { user_id: req.body.user_id } }
    )
      .then(() => {
        next();
      })
      .catch((err) => {
        res.status(400).json(`Something went wrong when saving token to database: ${err}`);
      });
  } else {
    next();
  }
};

module.exports = dbupdates;
