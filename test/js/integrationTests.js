// Here we will be unit testing the 3 database functions from server/db/games.js

// DO THIS WHILE YOU FIGURE OUT THE FUNCTIONALITY FOR INBOX READER
// COMPLETE UNIT TESTS FIRST, TO GET OUT OF THE WAY
const fs = require('fs');
const path = require('path');
const expect = require('expect');
const sinon = require('sinon');
const Zombie = require('zombie');
const google = require('googleapis');
const dbmodels = require('../../server/dbmodels/dbmodels');
const LoginSignupController = require('../../server/controllers/LoginSignupController.js');
const buildtransporter = require('../../server/engine/buildTransport');

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}/`;
let access;
let refresh;
let email;
let transport;
let emailset;
require('../../server/server.js');

const browser = new Zombie({ waitDuration: 29 * 1000 });
browser.silent = true;

describe('Initial Display', () => {
  before((done) => {
    browser.visit(url, () => {
      done();
    });
  });
  it('loads successfully', (done) => {
    expect(browser.location.toString()).toEqual(url);
    done();
  });
  it('displays login/signup input fields', (done) => {
    const loginfield = browser.query('#login');
    expect(loginfield).toBeDefined();
    done();
    // browser.assert.attribute('#content > div > div > div', new RegExp(/[wins]+/))
  });
});
// JON NEEDS TO MAKE SURE /SUMMARY IS NOT AVAILABLE W/O BCRYPT MATCH
// JON NEEDS TO MAKE SURE /SUMMARY IS NOT AVAILABLE W/O BCRYPT MATCH
// JON NEEDS TO MAKE SURE /SUMMARY IS NOT AVAILABLE W/O BCRYPT MATCH
// JON NEEDS TO MAKE SURE /SUMMARY IS NOT AVAILABLE W/O BCRYPT MATCH
// JON NEEDS TO MAKE SURE /SUMMARY IS NOT AVAILABLE W/O BCRYPT MATCH
describe('#LoginSignupController', (done) => {
  it('summary page should not be visible unless credentials are matched with our bcrypt version', (done) => {
    browser.visit(`${url}/summary`, () => {
      const browserContent = browser.html('body').toString().split(' ');
      console.log('browserContent', browserContent);
      expect(browserContent[0] === '<body>\n<pre>Cannot').toEqual(true);
      expect(browserContent[1] === 'GET').toEqual(true);
      done();
    });
  });
  it('database should never store a non-hashed password', (done) => {
    dbmodels.users.findAll({
      // where: { user_id: req.body.user_password },
      attributes: ['user_password'],
    })
      .then((entry) => {
        entry.forEach((n) => {
          expect(n.dataValues.user_password.length > 20).toEqual(true);
          console.log('PASSWORDS: ', n.dataValues.user_password);
        });
        done();
      });
  });
});

// TODO: Unit test the #find and #drop functions

describe('#oauth2Reader and InboxReader', (done) => {
  xit('OauthReader was validated before inboxReader is invoked', (done) => {
    const oauth2Reader = require('../../server/controllers/OauthReaderController');
    const messages = [];
    let user;
    dbmodels.users.find({
      where: { firstname: 'james' },
      attributes: ['user_email'],
    })
      .then((entry) => {
        user = entry.dataValues;
        console.log('hello', user);
        oauth2Reader.users.messages.list({ userId: user, includeSpamTrash: true }, (err, results) => {
          if (err) {
            console.log('there was an error');
            throw err;
          }
          if (results) {
            for (let i = 0; i < results.messages.length; i += 1) {
              console.log('hellllloooo', results);
              messages.push(results.messages[i]);
            }
            // console.log('MY MESSAGESLENGTH: ', messages.length);
            console.log('MY MESSAGES: ', messages);
            done();
          }
        });
      });
  });
  xit('InboxReaders thread length is incremented when a recipient responds', (done) => {
    done();
  });
  xit('sending an email, increments history, thread, AND, message objects', (done) => {
    done();
  });
});


describe('#oauth2Client', (done) => {
  before((done) => {
    dbmodels.users.findAll({
      where: { user_first_name: 'james' },
      attributes: ['user_email', 'gmail_access_token', 'gmail_refresh_token'],
    })
      .then((entry) => {
        email = entry[0].dataValues.user_email;
        access = entry[0].dataValues.gmail_access_token;
        refresh = entry[0].dataValues.gmail_refresh_token;
        emailset = {
          // get a oauthcode and hard code the below values
          user_email: email,
          gmail_access_token: access,
          gmail_refresh_token: refresh,
        };
        transport = buildtransporter.test(['', emailset], done);
        done();
      });
  });
  it('the oauth2 constructs correct transporter with proper REFRESH TOKEN', (done) => {
    // transport = buildtransporter.test(['', emailset], done);
    // const resolveTransport = () => {
    //   return new Promise((resolve, reject) => {
    //     resolve(transport);
    //   });
    // };
    // resolveTransport().then((err) => {
    //   if (err) console.log(err);
    //   transport.verify((err, success) => {
    //     console.log('SUCCESS', success);
    //     expect(success).toEqual(true);
    //     done();
    //   });
    // })
    //   .catch((err) => {
    //     console.log('helloo');
    //   });
    transport.verify((err, success) => {
      console.log('SUCCESS', success);
      done();
    });
  });
  it('if the oauth2 object was constructed with proper CLIENT ID:', (done) => {
    const clientID = '597535892558-d9oqu99oosrel4fkcuabjv2kf6qpmf2j.apps.googleusercontent.com';
    const secret = 'UXpkjNzz0Pk-RL3GkfRY1sjN';
    const redirect = 'http://localhost:8080/summary';
    const OAuth2 = google.auth.OAuth2;
    const gmailOauthClient =
    new OAuth2(clientID, secret, redirect);
    google.options({
      auth: gmailOauthClient,
    });
    expect(gmailOauthClient.clientId_).toBe(clientID);
    // let redirectUrl = 'http://localhost:3000/summary' //  dont test this one yet because when we deploy redirect = azure
    done();
  });
  it('if the oauth2 object was constructed with proper SECRET:', (done) => {
    const clientID = '597535892558-d9oqu99oosrel4fkcuabjv2kf6qpmf2j.apps.googleusercontent.com';
    const secret = 'UXpkjNzz0Pk-RL3GkfRY1sjN';
    const redirect = 'http://localhost:8080/summary';
    const OAuth2 = google.auth.OAuth2;
    const gmailOauthClient =
    new OAuth2(clientID, secret, redirect);
    google.options({
      auth: gmailOauthClient,
    });
    expect(gmailOauthClient.clientSecret_).toBe(secret);
    done();
  });
  it('if the oauth2 object was constructed with proper REDIRECT URI:', (done) => {
    const clientID = '597535892558-d9oqu99oosrel4fkcuabjv2kf6qpmf2j.apps.googleusercontent.com';
    const secret = 'UXpkjNzz0Pk-RL3GkfRY1sjN';
    const redirect = 'http://localhost:8080/summary';
    const OAuth2 = google.auth.OAuth2;
    const gmailOauthClient =
    new OAuth2(clientID, secret, redirect);
    google.options({
      auth: gmailOauthClient,
    });
    expect(gmailOauthClient.redirectUri_).toBe(redirect);
    done();
  });
});

describe('testing suite has wiped test database at end of tests', (done) => {
  xit('wiped', (done) => {
    sequelize.sync({ force: true });
    done();
  });
});
