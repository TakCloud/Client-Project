const nodemailer = require('nodemailer');
const accessToken = require('../access_token').access_token;
const refreshToken = require('../access_token').refresh_token;
// const refresh_token = require('../access_token').refresh_token
const transporter = nodemailer.createTransport({
  //  you can access the contents of this specific object
  // by console.log(options)
  streamTransport: true,
  newline: 'windows',
  pool: true,
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  // this auth property needs to be able to be set up programatically
  // whenever a new refresh_token is accepted
  auth: {
    type: 'OAuth2',
    // user: needs to be programmatically set
    // discuss putting input field for clients USEGMAIL accout.
    user: 'test.zero0001@gmail.com',
    accessToken,
    // accessToken: needs to be query to sql for most updated accesstoken
    refreshToken,
    // refreshtoken: needs to be query to sql for most updated refreshToken
  },
},
{ from: 'alexhong742@gmail.com' });
// nodemailer.createTestAccount((err, account) => {
//   if (err) {
//     console.error('Failed to create a testing account');
//     console.error(err);
//     return process.exit(1);
//   }
// })

module.exports = transporter;
