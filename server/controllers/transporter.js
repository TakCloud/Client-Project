const nodemailer = require('nodemailer');
const accessToken = require('../access_token').access_token;
const refreshToken = require('../access_token').refresh_token;
const transporter = nodemailer.createTransport({
  streamTransport: true,
  newline: 'windows',
  pool: true,
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  // this auth property needs to be able to be programatically
  // set the auth.user field when a new refresh_token is introduced
  auth: {
    type: 'OAuth2',
    // discuss putting input field for clients USEGMAIL accout.
    user: 'cheatcodes001@gmail.com',
    accessToken,
    // accessToken: needs to be query to sql for most updated accesstoken
    refreshToken,
    // refreshtoken: needs to be query to sql for most updated refreshToken
  },
},
{ from: 'alexhong742@gmail.com' });
module.exports = transporter;
