const path = require('path');
const messageDBController = require('./messageDBController');
// const simpleParser = require('mailparser').simpleParser;
const transporter = require('./transporter');
// const nodemailer = require('nodemailer');
// const inbox = require('./inboxReader');
// const oauth2Client = require('./oauthCreator');

const msgHeader = 'Supreme Leader!';
const msgToSend = 'mail sent??';
const msgEndPoints = ['test.receiver0001@gmail.com', 'alexhong432@gmail.com', 'test.receiver0002@gmail.com', 'test.receiver0003@gmail.com'];
// const oauth2Client = require('./oauthCreator');
// oauth2Client.credentials = 'the most recently stored token';
//  the above method can be used if sql queries get expensive to grab accessToken

const sender = (req, res) => {
  const theMessage = { // look up 'more Advanced fields in nodemailer.com/messages 
    envelope: {//  envelop shows what the recipient will see while the above is sender view
      from: 'alexhong432@gmail.com', // used as MAIL FROM: address for SMTP SENDER
      to: 'babjaklbjalbjka', // used as RCPT TO: arry of address' for SMTP     THIS IS THE SEND ENVOLOP TO NOT SEND MESAGE TO
      dsn: {
        id: 'some random message specific id',
        return: 'headers', //  or 'full'
        notify: ['failure', 'delay'],
        recipient: 'alexhong432@gmail.com',
      },
    },
    subject: msgHeader,
    // html: `<b>${msgToSend}!</b>`,
    html: '<b><img src="https://cheatcodes5.herokuapp.com/summary/imageTracker?alexiskooooooool"/></b>',
    text: msgToSend,
    // dsn: {
    //   id: 'some random message specific id',
    //   return: 'headers', //  or 'full'
    //   notify: ['failure', 'delay', 'success'],
    //   recipient: 'alexhong432@gmail.com',
    // },
  };
  if (transporter) {
    transporter.verify((error) => {
      if (error) {
        // if the token is no longer valid, we want to route them back to
        // /oauth so we can use the CODE to generate a new access token
        // then we must refresh database to show user w/updated token
        console.log('current access_token is no longer valid');
        res.redirect('/oauth');
        console.log(error);
      } else {
        // console.log('options', transporter.options); re
        // actual method for sending mail => build email and send via this method
        for (let i = 0; i < msgEndPoints.length; i += 1) {
          theMessage.to = msgEndPoints[i];
          theMessage.envelope.to = msgEndPoints[i];
          // console.log('this is the modified message: ', theMessage);
          transporter.sendMail(theMessage, (err, info) => {
            transporter.on('idle', () => {
              console.log(' transporter is idle');
            });
            if (err) console.log(err);
            // console.log(secondOauth2Client, 'this is the secondOauth2Client');
            // console.log(oauth2Client, 'this is original oauth2Client');
            console.log(transporter.isIdle(), ' transporter is idle and message was sent');
            // console.log(`MessageSent: ${msgHeader}, ${msgToSend}\n DSN INFO:`, info);
            info.message.pipe(process.stdout);
          });
        }
        console.log(messageDBController, 'will print out inbox history');
        console.log(' you are still connected: ', transporter.isIdle());
        res.sendFile(path.join(__dirname, '../../index.html'));
      }
    });
  }
};

module.exports = sender;
