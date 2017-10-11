const fs = require('fs');
const path = require('path');
const expect = require('expect');
const sinon = require('sinon');
const Zombie = require('zombie');
const google = require('googleapis');
const dbmodels = require('../../server/dbmodels/dbmodels');
const dbcontroller = require('../../server/dbcontrollers/dbcontroller');
const LoginSignupController = require('../../server/controllers/LoginSignupController');
const sequelize = require('../../server/dbcontrollers/sequelize_instance');
const buildtransporter = require('../../server/engine/buildTransport');
require('../../server/server.js');

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}/`;
let emailset = {};
let access;
let refresh;
let currentEmailStatus;
let email;
let transport;
let current;
const userID = [];
const message = {
  envelope: {
    from: emailset.email,
    to: emailset.email,
    dsn: {
      id: 'some random message specific id',
      return: 'headers',
      notify: ['failure', 'delay', 'success'],
      recipient: emailset.email,
    },
  },
  subject: 'halo',
  html: `<b><img src="https://cheatcodes5.herokuapp.com/summary/imageTracker?thisPersonOpenedEmail=${'me'}"/></b>`,
  text: emailset.gmail_access_token,
};
const browser = new Zombie({ waitDuration: 29 * 1000 });
browser.silent = true;

describe('Unit Tests', () => {
  before((done) => {
    browser.visit(url, () => {
      done();
    });
  });
  it('loads successfully', (done) => {
    expect(browser.location.toString()).toEqual(url);
    expect(3).toEqual(3);
    done();
  });
});

describe('#initial login', (done) => {
  it('user should be created upon signup', (done) => {
    dbmodels.users.findAll({
    // dbmodels.users.find({
      where: { user_first_name: 'alex' },
      attributes: ['user_email', 'gmail_access_token', 'gmail_refresh_token'],
    })
      .then((entry) => {
        if (entry[0]) {
          email = entry[0].dataValues.user_email;
          access = entry[0].dataValues.gmail_access_token;
          refresh = entry[0].dataValues.gmail_refresh_token;
          console.log('MATCHED: ', access);
          expect(entry[0].dataValues.gmail_access_token).toBeDefined();
        } else {
          console.log('alexbong is not in database so create him');
          const createUser = {
            route: {
              path: '/createuser',
            },
            body: {
              user_first_name: 'xela',
              user_last_name: 'bong',
              user_organization_name: 'alex',
              user_organization_id: 3,
              user_email: 'test.receiver0001@gmail.com',
              user_password: '1234',
              // password is 1234
              role: 'user',
              email_signature: 'sig goes here',
              send_as_email: 'test.receiver0001@gmail.com',
              reply_to_email: 'test.receiver0001@gmail.com',
            },
          };
          dbcontroller.createUser(createUser, { locals: {} }, done);
        }
        done();
      });
  });
  xit('if user\'s first experience: they should be routed to oauth immediately rather than summary', (done) => {
    done();
  });
});

describe('if user\'s gmail_access_token expired then engine should use refreshToken to update gmail_access_token', (done) => {
  before((done) => {
    emailset = {
      // get a oauthcode and hard code the below values
      user_email: email,
      gmail_access_token: '1233ihjiu3h124i3h41',
      gmail_refresh_token: refresh,
    };
    transport = buildtransporter.test(['', emailset], done);
    done();
  });
  it('user should have null for access/refresh token until oauth signup and transporter.veryify should return falsy', (done) => {
    // emailset.gmail_access_token = '';
    transport.verify((err, success) => {
      // if (err) console.log(err);
      expect(success).toBe(undefined);
      done();
    });
  });
  it('engine should use refreshToken to update gmail_access_token in database to a different value', (done) => {
    buildtransporter.build(['', emailset], done);
  });
  it('new accessToken should be different from new one', (done) => {
    dbmodels.users.findAll({
      where: { user_first_name: 'alex' },
      attributes: ['gmail_access_token'],
    })
      .then((entry) => {
        if (entry) {
          console.log(entry[0].dataValues.gmail_access_token);
          console.log(access);
          console.log(refresh);
          expect(entry[0].dataValues.gmail_access_token === access).toEqual(false);
          done();
        } else {
          console.log('could not find alex');
          // done();
        }
      });
  });
});

describe('engine should send mails with status \'pending\'', (done) => {
  before((done) => {
    dbmodels.campaigns.findAll({
      where: { user_id: '9' },
      attributes: ['status'],
    })
      .then((campaigns) => {
        console.log('campaigns: ', campaigns);
        current = campaigns.dataValues;
        done();
      });
  });
  it('adding a campaign should update database', (done) => {
    // check db before and after
    console.log(current);
    // now insert a lead and see if the campaigns field added a value
    // also check to see that email status was updated to 'pending'
    dbmodels.campaigns.findAll({
      where: { user_id: '9' },
      attributes: ['status'],
    })
      .then((campaigns) => {
        console.log('CAMPAIGNS: ', campaigns);
        console.log('CURRENT: ', current);
        // expect(current === campaigns.dataValues).toEqual(false);
        done();
      });
  });
 
  xit('if engine polls db when email status is pending, transporter should send mail', (done) => {
    // insert a lead that's past due, then see if running the engine sends a mail to a recipient
    // then we need to check the actual email acc to see if message got sent
    dbmodels.emails.findAll({
      where: {
        status: 'pending',
        $and: { send_at: { $lt: Date.now() } },
      },
      include: [{
        model: dbmodels.users,
        attributes: ['user_id', 'user_email', 'gmail_access_token', 'gmail_refresh_token'],
      },
      {
        model: dbmodels.leads,
        attributes: ['lead_id', 'lead_first_name', 'lead_last_name', 'lead_email'],
      }],
    })
      .then((entries) => {
        console.log('ENTRIES: ', entries);
        // entries.dataValues.forEach((id) => {
        //   userID.push(entries.dataValues.user_id);
        // });
        done();
      });
  });
  xit('if emails were sent, database should reflect the update', (done) => {
    dbmodels.emails.findAll({
      where: {
        status: 'pending',
        $and: { send_at: { $lt: Date.now() } },
      },
      include: [{
        model: dbmodels.users,
        attributes: ['user_id', 'user_email', 'gmail_access_token', 'gmail_refresh_token'],
      },
      {
        model: dbmodels.leads,
        attributes: ['lead_id', 'lead_first_name', 'lead_last_name', 'lead_email'],
      }],
    })
      .then((entries) => {
        console.log('ENTRIES: ', entries);
        expect(entries).toEqual(null);
        done();
      });
  });
});
