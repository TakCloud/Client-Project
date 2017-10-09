const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbcontroller = require('./dbcontrollers/dbcontroller.js');
const dbupdates = require('./dbcontrollers/dbupdates.js');
const dbqueries = require('./dbcontrollers/dbqueries.js');
const verifyToken = require('./controllers/verifyToken.js');
const LoginSignupController = require('./controllers/LoginSignupController');
const engine = require('./engine/engine.js');

const oauthUrl = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=674930641729-at55ett8pbck27uu5ektiniq91bu8dfd.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fcheatcodes5.herokuapp.com%2Fsummary';
// use the above url for production, and the below for development
// const oauthUrl = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=597535892558-d9oqu99oosrel4fkcuabjv2kf6qpmf2j.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsummary';

const app = express();
const port = process.env.PORT || 3000;
process.env.NODE_ENV = 'production';
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

app.get('/summary/imageTracker?', (req, res) => {
  console.log('Ping*IMAGE TRACKER WAS HIT!!!!*ponG \n', req.query);
  res.sendFile(path.join(__dirname, '../4-tree-png-image-download-picture.png'));
});


app.post('/oauthlogin', (req, res) => {
  console.log('This is the req.query ', req.query);
  res.send(oauthUrl);
});
app.get('/googlec45609043392fa00', (req, res) => res.sendFile(path.join(__dirname, '../../googlec45609043392fa00.html')));
app.get('/summary/googlec45609043392fa00', (req, res) => res.sendFile(path.join(__dirname, '../../googlec45609043392fa00.html')));

app.post('/login',
  LoginSignupController,
  dbqueries.grabState,
  (req, res) => {
    res.json(res.locals.databaseEntry);
  });
// we may be able to handle the /login and /signup logic through react Router
// leave these routes until react router is implemented

app.post('/signup', (req, res) => {
  console.log(res, ' this is res on signup');
  res.end();
});

// begin routes for db interactions
app.post('/createorg',
  dbcontroller.createOrg,
  dbcontroller.createUser,
  dbqueries.grabState,
  (req, res) => {
    res.json(res.locals.databaseEntry);
  });

app.post('/createuser',
  dbcontroller.createUser,
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

app.post('/summary',
  verifyToken,
  dbupdates.saveToken,
  (req, res) => {
    res.send();
  });


app.listen(port, () => {
  console.log(`now listening on ${port}! \n`);
  // ** UNCOMMENT TO START ENGINE **  
  // engine.begin();
});
