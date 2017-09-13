const simpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser
const parser = new MailParser
module.exports = (req,res) => {
  console.log('this is the req.body from the email, ',  Object.keys(req.body))
  let emailContents = [];
  for(let w in req.body){
    if(w !== 'body'){
      simpleParser(req.body[w]).then(mail=>{
        console.log('mail got parsed!! ', mail);
        emailContents.push(mail);
      }).catch(err=>{
        console.log('there was an error parsing the mail: ', err);
        res.send(err);
      });
    } else {
      setTimeout(() => {
        console.log(emailContents, 'these are the email contents');
        res.send(emailContents);
      }, 500);
        
    };
  };
}