const path = require('path');
const fs = require('fs');

module.exports = {
  emailModifier(req, res, next) {

    fs.readFile(path.join(__dirname, '../../client/messages/firstMessage.json'), 'utf8', (err, data) => {
      const modifications = req.body;
      if (err) throw err;
      const currentEmail = JSON.parse(data);
      console.log(modifications)
      //need to review how to mime/pipe readable streams becuase this datastream is definitely too long
      if (currentEmail.from) currentEmail.from = modifications.from;
      if (currentEmail.to) currentEmail.to = modifications.to;
      if (currentEmail.cc) currentEmail.cc = modifications.cc;
      if (currentEmail.bcc) currentEmail.bcc = modifications.bcc;
      if (currentEmail.subject) currentEmail.subject = modifications.subject;
      if (currentEmail.text) currentEmail.text = modifications.text;
      if (currentEmail.html) currentEmail.html = modifications.html;
      if (currentEmail.attachments) currentEmail.attachments = modifications.attachments;
      const modifiedCurrentEmail = JSON.stringify(currentEmail, null, 1);
      fs.writeFile(path.join(__dirname, '../../client/messages/firstMessage.json'), modifiedCurrentEmail, (error) => {
        if (error) throw error;
        console.log("emailModifier has modified the file")
        res.end()
        // next();
      });
    });
  },
};
