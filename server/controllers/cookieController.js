const fs = require('fs')
const path = require('path')
const sessionController = require('./sessionController');

const cookieController = {};

const setSSIDCookie = (req, res, next) => {
  fs.readFile(path.join(__dirname, '../../client/messages/members.json'), 'utf8', (err, data) => {
    console.log(req.body,'reqbody from setSSIDCookie')
    const newUser = req.body.cookieSetter;
    if (err) throw err;
    const currentUser = JSON.parse(data);
    if (newUser.user === currentUser.user && newUser.pass === currentUser.pass) {
      res.cookie('ssid', currentUser["_id"], { httpOnly: true })
      currentUser["_id"] = newUser["_id"]
      console.log(currentUser["_id"],' this is res.ssid')
    }
    const modifiedCurrentUser = JSON.stringify(currentUser, null, 1);
    fs.writeFile(path.join(__dirname, '../../client/messages/members.json'), modifiedCurrentUser, (error) => {
      if (error) throw error;
      next();
    });
  })
}
cookieController.setSSIDCookie = setSSIDCookie;
module.exports = cookieController;
