const path = require('path');
const fs = require('fs');
const message = require('../../client/messages/messageTest');

module.exports = {
  emailModifier(req, res, next) {
    let modifications = req.body;
    let currentEmail = Object.assign(Object.create(null),message);
    let temp = Object.create(null);
    //need to review how to mime/pipe readable streams becuase this datastream is definitely too long
    if (modifications.DeliveredTo) currentEmail.DeliveredTo = modifications.DeliveredTo;
    if (modifications.from) currentEmail.from = modifications.from;
    if (modifications.to) currentEmail.to = modifications.to;
    if (modifications.bcc) currentEmail.bcc = modifications.bcc;
    if (modifications.subject) currentEmail.subject = modifications.subject;
    if (modifications.text) currentEmail.text = modifications.text;
    if (modifications.html) currentEmail.html = modifications.html;
    if (modifications.attachments) currentEmail.attachments = modifications.attachments;
    const modifiedCurrentEmail = JSON.stringify(currentEmail, null, 1);
    res.ssid = modifiedCurrentEmail;
    fs.writeFile(path.join(__dirname, '../../client/messages/firstMessage.json'), modifiedCurrentEmail, (error) => {
      if (error) throw error;
      console.log("emailModifier has modified the file", modifiedCurrentEmail)
      next();
    });
  },
};
