const path = require('path');
const fs = require('fs');

module.exports = {
  emailModifier(req, res, next) {
    console.log("emailModifier")
    fs.readFile(path.join(__dirname, '../../client/messages/firstMessage.json'), 'utf8', (err, data) => {
      const modifications = req.body.modifications;
      if (err) throw err;
      const currentEmail = JSON.parse(data);
      //need to review how to mime/pipe readable streams becuase this datastream is definitely too long
      if (options.from) currentEmail.from = options.from;
      if (options.to) currentEmail.to = options.to;
      if (options.cc) currentEmail.cc = options.cc;
      if (options.bcc) currentEmail.bcc = options.bcc;
      if (options.subject) currentEmail.subject = options.subject;
      if (options.text) currentEmail.text = options.text;
      if (options.html) currentEmail.html = options.html;
      if (options.attachments) currentEmail.attachments = options.attachments;
      const modifiedCurrentEmail = JSON.stringify(currentEmail, null, 1);
      fs.writeFile(path.join(__dirname, '../../client/messages/firstMessage.json'), modifiedCurrentEmail, (error) => {
        if (error) throw error;
        next();
      });
    });
  },
};
