const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const authUrlProvider = require('./controllers/authUrlProvider');
const tokenFiler = require('./controllers/tokenFiler');
const messageSender = require('./controllers/messageSender');

const app = express();
app.use(express.static('./../build'));
app.use(express.static('./../client'));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, PATCH');
  next();
});
// industry best practice for using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.post('/oauthlogin', authUrlProvider);
app.get('/oauth', tokenFiler);
app.post('/sendmail', messageSender);

app.listen(8080, () => {
  console.log('now listening on 8080! \n');
});
