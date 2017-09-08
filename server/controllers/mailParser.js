const simpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser
const parser = new MailParser
module.exports = (req,res) => {
  console.log('this is the req.body from the email, ', req.body)
  // for(let w in req.body){
  //   simpleParser(req.body).then(mail=>{
  //     console.log('mail got parsed!! ', mail)
  //     res.send(mail)
  //   }).catch(err=>{
  //     console.log('there was an error parsing the mail: ', err)
  //     res.send(err)
  //   })
  // }
  let source = Object.keys(req.body)[0]
  console.log(source)
  simpleParser(source).then(mail=>{
    console.log('mail got parsed!! ', mail)
    res.send(mail)
  }).catch(err=>{
    console.log('there was an error parsing the mail: ', err)
    res.send(err)
  })
  
}