const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const authUrlProvider = require('./controllers/authUrlProvider');
const tokenFiler = require('./controllers/tokenFiler');

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
app.get('/login',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  },
);
app.post('/login',
  authUrlProvider,
  (req, res) => {
    console.log(res.locals, ' res.locals.auth to be sent to frontend');
    //  response is sending the authURL to the frontend so that
    //  the front end can call window.location on the authURL
    res.send(res.locals);
  },
);
app.get('/oauth',
  (req, res, next) => {
    res.locals.code = req.query.code;
    next();
  },
  tokenFiler,
  (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  },
);

app.listen(8080, () => {
  console.log('now listening on 8080!');
});
