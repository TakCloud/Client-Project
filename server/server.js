const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbcontroller = require('./dbcontrollers/dbcontroller.js');
const dbupdates = require('./dbcontrollers/dbupdates.js');
const dbqueries = require('./dbcontrollers/dbqueries.js');
const verifyToken = require('./controllers/verifyToken.js');
const messageSender = require('./controllers/messageSender');
const LoginSignupController = require('./controllers/LoginSignupController');
const engine = require('./engine/engine.js');

const oauthUrl = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=597535892558-d9oqu99oosrel4fkcuabjv2kf6qpmf2j.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsummary';

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

app.post('/oauthlogin', (req, res) => {
  res.send(oauthUrl);
});

// jon is testing here
app.get('/summary', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/testfile.html'));
});

app.post('/summary',
  verifyToken,
  dbupdates.saveToken,
  (req, res) => {
    res.send();
  });

app.post('/sendmail', messageSender);
app.post('/login',
  LoginSignupController,
  dbqueries.grabState,
  (req, res) => {
    res.json('success'); // need to update
  });
// we may be able to handle the /login and /signup logic through react Router
// leave these routes until react router is implemented
app.post('/signup', (req, res) => {
  console.log(res, ' this is res on signup');
  res.end();
});

// begin routes for db interactions
app.post('/createorg',
  dbcontroller.insert,
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


const models = require('./dbmodels/dbmodels.js');
app.get('/test',
  (req, res) => {
    models.users.findAll({
      where: { user_id: 1 },
      include: [{
        model: models.campaigns,
        include: [{
          model: models.campaign_steps,
          include: [models.templates],
        }],
      }],
    })
      .then((entry) => {
        console.log(entry);
        res.json(entry);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

app.listen(8080, () => {
  console.log('now listening on 8080! \n');
  /* * UNCOMMENT TO RUN MAILING ENGINE * */
  // engine.begin();
});
