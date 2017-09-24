const path = require('path');
const messageDBController = require('./inboxProcessor');
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
  const theMessage = {
    envelope: {
      from: 'alexhong432@gmail.com',
      to: 'babjaklbjalbjka',
      dsn: {
        id: 'some random message specific id',
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: 'alexhong432@gmail.com',
      },
    },
    subject: msgHeader,
    html: '',
    text: msgToSend,
  };
  if (transporter) {
    transporter.verify((error) => {
      if (error) {
        console.log('current access_token is no longer valid', error);
        res.redirect('/oauth');
      } else {
        for (let i = 0; i < msgEndPoints.length; i += 1) {
          theMessage.to = msgEndPoints[i];
          theMessage.envelope.to = msgEndPoints[i];
          theMessage.html = `<b><img src="https://cheatcodes5.herokuapp.com/summary/imageTracker?alexiskooooooool=${msgEndPoints[i]}"/></b>`;
          transporter.sendMail(theMessage, (err, info) => {
            // console.log(`this is the modified message: , ${theMessage} \n`);
            transporter.on('idle', () => {
              console.log(' transporter is idle');
            });
            if (err) console.log(err);
            console.log('Transporter is idle and message was sent: ', transporter.isIdle());
            // console.log(`MessageSent: ${msgHeader}, ${msgToSend}\n DSN INFO:`, info);
            info.message.pipe(process.stdout);
          });
        }
        console.log(`Inbox History: ${messageDBController}`);
        console.log(' you are still connected: ', transporter.isIdle());
        res.sendFile(path.join(__dirname, '../../index.html'));
      }
    });
  }
};

module.exports = sender;
