const nodemailer = require('nodemailer');
const accessToken = require('../access_token').access_token;
const refreshToken = require('../access_token').refresh_token;
// const refresh_token = require('../access_token').refresh_token
const transporter = nodemailer.createTransport({
  //  you can access the contents of this specific object
  // by console.log(options)
  pool: true,
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
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
},
{ from: 'alexhong742@gmail.com' });

module.exports = transporter;
