const mongoose = require('mongoose');
const Schema = mongoose.Schema

let messageSchema = new Schema({
  from: String,
  to: String,
  cc: String,
  bcc: String,
  subject: String,
  text: String,
  html: Html,
  attachments: {required: false}
})
module.exports = mongoose.model('Message', messageSchema)

// from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted ’“Sender Name” sender@server.com‘, see Address object for details
// to - Comma separated list or an array of recipients email addresses that will appear on the To: field
// cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
// bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
// subject - The subject of the email
// text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…’})
// html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…‘})
// attachments - downloads