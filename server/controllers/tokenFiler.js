const fs = require('fs');
const oauth2Client = require('./oauthCreator');
const path = require('path');
const refresh = require('../access_token').refresh_token;
const transporter = require('./transporter');
const accessToken = require('../access_token.json');

module.exports = (req, res) => {
  // use this tokenDir/tokenPath, the uncommented tokenDir/Path are for practice
  // const TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH ||
  //   process.env.USERPROFILE)}/.credentials/`;
  // const TOKEN_PATH = `${TOKEN_DIR} gmail.json`;
  const TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE)}/Desktop/credentials/`;
  const TOKEN_PATH = `${TOKEN_DIR} gmail.json`;

  //  Store token to disk be used in later program executions.
  const storeToken = (token) => {
    // change the logic so that we are storing to sql
    // or updateing token on a user in sql
    // 
    // we can also use an alternative method of grabbing token here
    // then passing it over to front end on resLocals and accessing this token
    // which now represents the most updated token, where we can write headers onto the transporter
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.log('token_dir already exists');
        throw err;
      }
    }
    if (token) {
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), () => {
        console.log(`Token stored locally at Credentials Folder: ${TOKEN_PATH}`);
        fs.readFile(path.join(__dirname, '../access_token.json'), 'utf8', (err, data) => {
          if (err) throw err;
          let pkg = JSON.parse(data);
          if (token.refresh_token) {
            pkg = token;
          } else {
            pkg.access_token = token.access_token;
          }
          console.log(pkg, 'this is the after');
          const pkgJSON = JSON.stringify(pkg, null, 1);
          fs.writeFile(path.join(__dirname, '../access_token.json'), pkgJSON, (error) => {
            if (error) throw error;
            console.log('AccessToken updated in database: ', pkgJSON);
            res.sendFile(path.join(__dirname, '../../index.html'));
          });
        });
      });
    } else res.sendFile(path.join(__dirname, '../../index.html'));
  };
  transporter.verify((err, success) => {
    if (err) {
      console.log('Error:   Token cannot be used to authenticate!', JSON.parse(JSON.stringify(accessToken)));
      oauth2Client.getToken(req.query.code, (errr, token) => {
        if (errr) {
          console.log('Error while trying to retrieve access token w/current CODE: ', errr);
          oauth2Client.getToken(refresh, (error, newToken) => {
            if (err) console.log('Error2 while trying to retrieve access token w/refresh_token: ', error);
            oauth2Client.credentials = newToken;
            storeToken(newToken);
            console.log(`Token accessed w/refresh_token stored on oaut2Client.credentials: ${JSON.stringify(newToken)}`);
          });
        }
        if (token) { //  change back!! we only want to store if !token.refresh_token 
          oauth2Client.credentials = token;
          storeToken(token);//  try throwing a try/catch inside of this callback instead of outside
          console.log(`Token accessed w/new req.query.code, stored on oaut2Client.credentials: ${JSON.stringify(token)}`);
        } else {
          res.sendFile(path.join(__dirname, '../../index.html'));
        }
      });
    }
    if (success) {
      console.log('transporter still connected with current accessToken', accessToken.access_token, '\n');
      res.sendFile(path.join(__dirname, '../../index.html'));
    }
  });
};


//   if (!transporter.verify()) {
//     // if transporter isIdle then the access token that user used is still vali
//     console.log('transporter is connected but needs to use refreshToken to issue new Token');
//     oauth2Client.getToken(req.query.code, (errr, token) => {
//       if (errr) {
//         console.log('Error while trying to retrieve access token w/current access: ', errr);
//         oauth2Client.getToken(refresh, (err, newToken) => {
//           if (err) console.log('Error2 while trying to retrieve access token w/
// refresh_token: ', err);
//           oauth2Client.credentials = newToken;
//           storeToken(newToken);
//           console.log(`Token accessed w/refresh_token stored on oaut2Client.credentials:
//  ${JSON.stringify(newToken)}`);
//         });
//       }
//       if (token) { //  change back!! we only want to store if !token.refresh_token 
//         oauth2Client.credentials = token;
//         storeToken(token);//  try throwing a try/catch inside of this callback instead of outside
//         console.log(`Token accessed w/access_token stored on oaut2Client.credentials:
//  ${JSON.stringify(token)}`);
//       } else {
//         res.sendFile(path.join(__dirname, '../../index.html'));
//       }
//     });
//   } else {
//     console.log('transporter still connected with current accessToken',
//  accessToken.access_token, '\n');
//     res.sendFile(path.join(__dirname, '../../index.html'));
//   }
// };
