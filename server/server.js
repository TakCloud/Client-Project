const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mailParser = require('./controllers/mailParser');
const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const cookieController = require('./controllers/cookieController');
const memberController = require('./controllers/memberController');
const messageController = require('./controllers/messageControllerRequired');
const OauthToken = require('./client_secret.json')
const authUrlProvider = require('./controllers/authUrlProvider')
const tokenFiler = require('./controllers/tokenFiler')
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
app.post("/signup",
  memberController.createUser,
  (req,res, next) => {
    console.log(req.body ,"request body from post request tosign up");
    res.redirect('/')
});
app.get("/login", 
  (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  }
);
let oathInfo;
app.post("/login",
  authUrlProvider,
  (req,res,next) => {
    console.log(res.locals, ' second middleware was hit res.locals.auth');
    oathInfo = res.locals;
    res.send(res.locals);
  }
  //this middleware will allow us to manipulate the access_token.json file so that it can add multiple access_tokens
  //as of now the jsonfile can only hold one token at a time

  // (req,res,next) => {
  //   console.log('third middleWare was hit')
  //   console.log(res.locals)
  //   if(res.locals.token) {
  //     console.log(res.locals.token, 'this is res.locals token')
  //     const token = JSON.parse(res.locals.token)["access_token"]
  //     console.log(token , ' this is the server side res.locals');
  //     fs.readFile(path.join(__dirname, './access_token.json'), 'utf8', (err, data) => {
  //       if (err) throw err;
  //       if(!data.token) {
  //         data = {token}
  //         const pkgJson = JSON.stringify(data);
  //         fs.writeFile(path.join(__dirname, './access_token.json'), pkgJson, (error) => {
  //           if (error) throw error;
  //           res.send(pkgJson)
  //         });
  //       } else {
  //         console.log(data,' this is data')
  //         const pkg = JSON.parse(data);
  //         pkg.tokens = token
  //         console.log(pkg, ' this is pkg')
  //         const pkgJson = JSON.stringify(pkg);
  //         fs.writeFile(path.join(__dirname, './access_token.json'), pkgJson, (error) => {
  //           if (error) throw error;
  //           res.send(pkgJson)
  //         });
  //       }
  //     });
  //   } else {res.send("hello")}
  // }
  // res.redirect('/login');
);
app.get("/assets/style.css", (req,res) => {
  res.sendFile(path.join(__dirname, '../client/assets/style.css'));
});
app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.post('/alex',
  messageController.emailModifier,
  mailParser
  );
// app.post('/alex', mailParser);
app.get('/alex', (req,res) => {
  //i need middleware here to access an array of the DB's contents
  res.send('hello');
});
app.get('/oauth/', 
  (req,res,next) => {
    res.locals.code = req.query.code;
    res.locals.oauth2Client = oathInfo.oauth2Client;
    console.log(res.locals.code, ' this is the code to feed the tokenFiler');
    console.log(oathInfo.oauth2Client, 'this is oathInfo Function');
    next();
  },
  tokenFiler,
  (req,res,next) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//an example of how express.Router() could make this above process easier

// const oauthRouter = express.Router();
// oauthRouter.get('/oauth', (req,res) => {
//   console.log(req.params, ' this is req.params')
//   res.sendFile(path.join(__dirname, '../index.html'));
// });
// app.use('/oauth', oauthRouter);

app.listen(8080, () => {
  console.log('now listening on 8080!');
});
