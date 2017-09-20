const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbcontroller = require('./dbcontrollers/dbcontroller.js');
const tokenFiler = require('./controllers/tokenFiler');

const oauthUrl = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=597535892558-d9oqu99oosrel4fkcuabjv2kf6qpmf2j.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth';

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
  (req, res) => {
    console.log(res.locals, ' res.locals.auth to be sent to frontend');
    //  response is sending the authURL to the frontend so that
    //  the front end can call window.location on the authURL
    res.json(oauthUrl);
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

app.post('/createorg',
  dbcontroller.insert,
  (req, res) => {
    res.json(res.locals.databaseEntry);
  });

app.post('/createuser',
  dbcontroller.insert,
  (req, res) => {
    res.json(res.locals.databaseEntry);
  });

app.post('/createleadgroup',
  dbcontroller.insert,
  (req, res) => {
    res.json(res.locals.databaseEntry);
  });

app.post('/createleads',
  dbcontroller.bulkInsert,
  (req, res) => {
    res.json('Success!');
  });

app.post('/createtemplate',
  dbcontroller.insert,
  (req, res) => {
    res.json(res.locals.databaseEntry);
  });

app.post('/createcampaign',
  dbcontroller.generateCampaign,
  (req, res) => {
    res.json(res.locals);
  });

app.listen(8080, () => {
  console.log('now listening on 8080!');
});
