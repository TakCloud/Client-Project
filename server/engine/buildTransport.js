const models = require('./../dbmodels/dbmodels.js');
const nodemailer = require('nodemailer');
const buildMessage = require('./buildMessage.js');

module.exports = (emailSet) => {
  // grab email and access tokens for given user to build transporter object
  models.users.find({
    where: { user_id: emailSet[0] },
    attributes: ['user_id', 'user_email', 'gmail_access_token', 'gmail_refresh_token'],
  })
    .then((entry) => {
      const user = entry.dataValues;
      const mailer = nodemailer.createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        requireTLS: true,
        auth: {
          type: 'OAuth2',
          user: user.user_email,
          accessToken: user.gmail_access_token,
          refreshToken: user.gmail_refresh_token,
        },
      });
      // pass to next function to have each email in emailSet sent off using mailer
      buildMessage(emailSet[1], mailer, user);
    })
    .catch((err) => {
      console.log(`Something went wrong when finding user: ${err}`);
    });
};
