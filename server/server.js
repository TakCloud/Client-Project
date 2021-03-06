const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbcontroller = require('./dbcontrollers/dbcontroller.js');
const dbupdates = require('./dbcontrollers/dbupdates.js');
const dbqueries = require('./dbcontrollers/dbqueries.js');
const verifyToken = require('./controllers/verifyToken.js');
const LoginSignupController = require('./controllers/LoginSignupController');
const engine = require('./engine/engine.js');
const oauth2Reader = require('./controllers/OauthReaderController');
const sessionController = require('./controllers/sessionController.js');
const cookieParser = require('cookie-parser');

// use the above url for production, and the below for development
// const oauthUrl = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=338372619030-uctj64mhdeipgf3301tjnvvrb6o1es70.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsummary';
const oauthUrl = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=674930641729-at55ett8pbck27uu5ektiniq91bu8dfd.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fcodesmithnodejs.azurewebsites.net%2Fsummary';
// const oauthUrl = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=916608654633-m4a4g8oe4m3ag65ccq4qh47ce2avfncu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Ffirstfreightdemo.azurewebsites.net%2Fsummary';

const app = express();
const port = process.env.PORT || 3000;
process.env.NODE_ENV = 'production';
app.use(express.static('./../build'));
app.use(express.static('./../client'));
app.use(express.static(path.join(__dirname, './../build')));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, PATCH');
  next();
});
// industry best practice for using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionController.verify);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.get('/summary/imageTracker',
// app.get('/summary/imageTracker?',
  (req, res, next) => {
    console.log('Ping*IMAGE TRACKER WAS HIT!!!!*ponG \n', req.query);
    res.locals = req.query;
    next();
  },
  dbupdates.removeCampaign,
  (req, res) => {
    res.sendFile(path.join(__dirname, '../client/4-tree-png-image-download-picture.png'));
  });

app.post('/oauthlogin', (req, res) => {
  console.log('This is the req.query ', req.query);
  res.send(oauthUrl);
});
app.get('/googlec45609043392fa00', (req, res) => res.sendFile(path.join(__dirname, '../../googlec45609043392fa00.html')));
app.get('/summary/googlec45609043392fa00', (req, res) => res.sendFile(path.join(__dirname, '../../googlec45609043392fa00.html')));

app.post('/login',
  LoginSignupController,
  sessionController.set,
  dbqueries.grabState,
  (req, res) => {
    res.json(res.locals.databaseEntry);
  });
app.get('/read',
  oauth2Reader,
  (req, res) => {
    console.log('this is res locals', res.locals);
    res.send(res.locals);
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

app.get('/summary',
  verifyToken,
  dbupdates.saveToken,
  (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
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
