const path = require('path');
const fs = require('fs');

module.exports = {
  createUser(req, res, next) {
    console.log("emailModifier")
    fs.readFile(path.join(__dirname, '../../client/messages/members.json'), 'utf8', (err, data) => {
      const newUser = req.body.modifications;
      if (err) throw err;
      const currentUser = JSON.parse(data);
      //need to review how to mime/pipe readable streams becuase this datastream is definitely too long
      if (newUser.user) currentUser.user = newUser.user;
      if (newUser.pass) currentUser.pass = newUser.pass;
      const modifiedCurrentUser = JSON.stringify(currentUser, null, 1);
      fs.writeFile(path.join(__dirname, '../../client/messages/members.json'), modifiedCurrentUser, (error) => {
        if (error) throw error;
        next();
      });
    });
  },
};
