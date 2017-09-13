const simpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser
const parser = new MailParser
module.exports = (req,res,next) => {
  console.log('mail parser was hit with res.ssid', res.ssid)
  let emailContents = [];
  for(let w in req.body){
    if(req.body[w] === 'string') {
      simpleParser(JSON.parse(req.body[w])).then(mail=>{
        console.log('mail got parsed!! ', mail);
        emailContents.push(mail);
      }).catch(err=>{
        console.log('there was an error parsing the mail: ', err);
        res.send(err);
      });
    } else {
      simpleParser(req.body[w]).then(mail=>{
        console.log('mail got parsed!! ', mail);
        emailContents.push(mail);
      }).catch(err=>{
        console.log('there was an error parsing the mail: ', err);
        res.send(err);
      });
    }
    if(req.body[w] === 'body') {
      simpleParser(JSON.parse(req.body[w])).then(mail=>{
        console.log('mail got parsed!! ', mail);
        emailContents.push(mail);
      }).catch(err=>{
        console.log('there was an error parsing the mail: ', err);
        res.send(err);
      });
      setTimeout(() => {
        console.log(emailContents, 'these are the email contents');
        res.end()
      }, 500);
    };
  };
}