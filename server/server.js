const express = require('express');
const app = express();
const path = require('path');
const bodyParse = require('body-parser');
const mailParser = require('./controllers/mailParser.js')
// const message = require('../../../msg.txt')
// const MailParser = require('mailparser').simpleParser()

app.use(bodyParse());
app.use(express.static('client'));

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/build', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.post('/alex', mailParser)
app.get('/alex', (req,res) => {
  res.send('hello')
})

// app.use('/assets', express.static('client'));

app.listen(3000, () => {
  console.log('now listening on 3000!');
});

