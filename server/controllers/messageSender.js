const path = require('path');
const transporter = require('./transporter');
// const transportServer = require('./transporterServer');

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
    },
    subject: msgHeader,
    html: `<b>${msgToSend}!</b>`,
    text: msgToSend,
    dsn: {
      id: 'some random message specific id',
      return: 'headers', //  or 'full'
      notify: ['failure', 'delay', 'success'],
      recipient: 'alexhong432@gmail.com',
    },
  };
  transporter.verify((error) => {
    if (error) {
      // if the token is no longer valid, we want to route them back to
      // /oauth so we can use the CODE to generate a new access token
      // then we must refresh database to show user w/updated token
      console.log('current access_token is no longer valid');
      res.redirect('/oauth');
      console.log(error);
    } else {
      // console.log('options', transporter.options);
      console.log('defaults', transporter.defaults);
      // actual method for sending mail => build email and send via this method
      for (let i = 0; i < msgEndPoints.length; i += 1) {
        theMessage.to = msgEndPoints[i];
        theMessage.envelope.to = msgEndPoints[i];
        console.log('this is the modified message: ', theMessage);
        transporter.sendMail(theMessage, (err, info) => {
          transporter.on('idle', () => {
            console.log(' transporter is idle');
          });
          console.log(transporter.isIdle(), ' transporter is idle');
          //  we need logic to parse specific analytics from this promised info object
          // then we need a way to send the parsed data to SQL
          // we can only get status for success, bounce, and hard bounce
          // we need status for opened!
          console.log(`MessageSent: ${msgHeader}, ${msgToSend}\n DSN INFO:`, info);
          info.message.pipe(process.stdout);
        });
      }
      console.log(' you are still connected: ', transporter.isIdle());
      res.sendFile(path.join(__dirname, '../../index.html'));
    }
  });
};

module.exports = sender;
