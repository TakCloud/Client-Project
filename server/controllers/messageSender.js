const path = require('path');
const transporter = require('./transporter');
// const oauth2Client = require('./oauthCreator');
// oauth2Client.credentials = 'the most recently stored token';
//  the above method can be used if sql queries get expensive to grab accessToken

// create transporter for sending mail => this specifies the protocal/credentials used to send mail

const sender = (req, res) => {
  // transporter.on('idle', () => {
  //   // send next message from the pending queue
  //   const messages = SQL query for array of messages in campaign steps
  //   while (transporter.isIdle() && messages.length) {
  //     set timeout to 48 hours
  //     transporter.sendMail(messages.shift());
  //   }
  // });
  transporter.verify((error) => {
    if (error) {
      // if the token is no longer valid, we want to route them back to
      // /oauth so we can use the CODE to generate a new access token
      // then we must refresh database to show user w/updated token
      console.log('current access_token is no longer valid');
      res.redirect('/oauth');
      console.log(error);
    } else {
      const header = 'Supreme Leader!';
      const msgToSend = 'You Are Cool';
      // actual method for sending mail => build email and send via this method
      transporter.sendMail({// look up 'more Advanced fields in nodemailer.com/messages
        // from: 'alexhong432@gmail.com', //  sender - An email address that will appear on the 
        //                Sender: field (always prefer from if you’re not sure which one to use)
        // to: 'alexhong432@gmail.com', // look up 'more Advanced fields in nodemailer.com/messages
        envelope: {//  envelop shows what the recipient will see while the above is what sender sees
          from: 'alexhong432@gmail.com', // used as MAIL FROM: address for SMTP SENDER
          to: 'test.receiver0001@gmail.com', // used as RCPT TO: arry of address' for SMTP     THIS IS THE SEND ENVOLOP TO NOT SEND MESAGE TO
        },
        subject: header,
        html: `<b>${msgToSend}!</b>`,
        text: msgToSend,
        dsn: {
          id: 'some random message specific id',
          return: 'headers', //  or 'full'
          notify: ['failure', 'delay', 'success'],
          recipient: 'alexhong432@gmail.com',
        },
      }, (err, info) => {
        console.log(info, 'this is info');
        //  we need logic to parse specific analytics from this promised info object
        // then we need a way to send the parsed data to SQL
        // we can only get status for success, bounce, and hard bounce
        // we need status for opened!
        info.message.pipe(process.stdout);
      });
      console.log(`MessageSent: ${header}, ${msgToSend}\n`);
      res.sendFile(path.join(__dirname, '../../index.html'));
    }
  });
};

module.exports = sender;
