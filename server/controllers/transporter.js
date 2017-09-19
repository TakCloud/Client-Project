const nodemailer = require('nodemailer');
const accessToken = require('../access_token').access_token;
const refreshToken = require('../access_token').refresh_token;
// const refresh_token = require('../access_token').refresh_token

const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.gmail.com',
  secure: true,
  // this auth property needs to be able to be set up programatically
  // whenever a new refresh_token is accepted
  auth: {
    type: 'OAuth2',
    user: 'test.zero0001@gmail.com',
    accessToken,
    // accessToken: needs to be query to sql for most updated accesstoken
    refreshToken,
    // refreshtoken: needs to be query to sql for most updated refreshToken
  },
  // This config would open a connection to TLS server with self-signed or invalid TLS certificate
  // tls: {
  //   // do not fail on invalid certs
  //   rejectUnauthorized: false,
  // },
  // we can include an object here for default values
  // eg.) {from: charles@gmail.com}
});

module.exports = transporter;
