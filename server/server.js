const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mailParser = require('./controllers/mailParser');
const loginSignupController = require('./controllers/loginSignupController');
const cookieController = require('./controllers/cookieController')
const memberController = require('./controllers/memberController')
// const message = require('../../../msg.txt')
// const MailParser = require('mailparser').simpleParser()

app.use(express.static('./../build'));
app.use(express.static('./../client'));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE, PATCH");
  next();
});
// industry best practice for using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.get("/signup", (req,res) => {
  res.sendFile(path.join(__dirname, '../client/signup.html'));
});
app.get("/login",
  (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  }
);
app.post("/signup",
  memberController.createUser,
  (req,res, next) => {
    console.log(req.body ,"request body from post request tosign up")
    res.redirect('/')
});
app.post("/login",
  cookieController.setSSIDCookie,
  (req,res,next) => {
    console.log(req.body ,"request body from post request to login");
    res.redirect('/login');
});

app.get("/assets/style.css", (req,res) => {
  res.sendFile(path.join(__dirname, '../client/assets/style.css'));
});
app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.post('/alex', mailParser);
app.get('/alex', (req,res) => {
  //i need middleware here to access an array of the DB's contents
  res.send('hello');
});

app.listen(8080, () => {
  console.log('now listening on 8080!');
});
