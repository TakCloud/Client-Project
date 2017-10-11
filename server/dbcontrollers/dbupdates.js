const models = require('./../dbmodels/dbmodels.js');

const dbupdates = {};

dbupdates.saveToken = (req, res, next) => {
  if (res.locals.token) {
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
  } else {
    next();
  }
};

dbupdates.removeCampaign = (req, res, next) => {
  if (res.locals.lead_email) {
    console.log('this person has opened this email!! ', res.locals);
    models.emails.findAll({
      attributes: ['email_id', 'from_user_id', 'lead_id'],
      where: { email_id: res.locals.email_id },
    })
      .then((users) => {
        console.log('remove campaign in dbupdates was hit', users);
        models.emails.update({
          status: 'stopped',
          // email status
          // all emails where lead id = proper lead id and 
          // status is pending 
        },
        {
          where: {
            // user_id: req.query.from_user_id,
            // email_id: res.locals.email_id,
            // $and: { lead_id:  res.locals.lead_id},
            lead_id: users.dataValues[0].lead_id,
          },
        })
          .then((leads) => {
            console.log('Ping: status is now stopped');
            next();
          })
          .catch((err) => {
            res.status(400).json(`Something went wrong when saving token to database: ${err}`);
          });
      });
  } else {
    next();
  }
};

module.exports = dbupdates;
