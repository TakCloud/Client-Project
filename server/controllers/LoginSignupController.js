const bcrypt = require('bcrypt');
const models = require('./../dbmodels/dbmodels.js');

module.exports = (req, res, next) => {
  models.users.find({
    attributes: ['user_id', 'user_password'],
    where: { user_email: req.body.username },
  })
    .then((entry) => {
      const inputPass = req.body.password;
      const savedPass = entry.dataValues.user_password;
      bcrypt.compare(inputPass, savedPass)
        .then((resolution) => {
          if (resolution) {
            console.log('the passes: ', inputPass, savedPass);
            res.locals.user_id = entry.dataValues.user_id;
            next();
          } else {
            console.log('the errors: ', inputPass, savedPass);
            res.status(400).json('Wrong username/password combo');
          }
        });
    })
    .catch((err) => {
      console.log(`Something went wrong when querying user: ${err}`);
      res.send();
    });
};
