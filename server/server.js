const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mailParser = require('./controllers/mailParser.js');
// const message = require('../../../msg.txt')
// const MailParser = require('mailparser').simpleParser()

app.use(express.static('build'));
app.use(express.static('client'));

//allow CORs
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE, PATCH");
  next();
});
// industry best practice for using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//serving up localhost 3000
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.post('/alex', mailParser);
app.get('/alex', (req,res) => {
  res.send('hello');
});
app.post('http://localhost:8080/alex', mailParser);
app.get('http://localhost:8080/alex', (req,res) => {
  res.send('hello');
});
// app.use('/assets', express.static('client'));

app.listen(3000, () => {
  console.log('now listening on 3000!');
});

