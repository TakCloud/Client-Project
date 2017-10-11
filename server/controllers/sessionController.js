const jwt = require('jsonwebtoken');

const sessionController = {};
const secret = 'firstfreight';

sessionController.set = (req, res, next) => {
  const user = { user: res.locals.user_id };
  const token = jwt.sign(user, secret, { expiresIn: '24h' });
  res.cookie('token', token);
  next();
};

sessionController.verify = (req, res, next) => {
  jwt.verify(req.cookies.token, secret, (err, decoded) => {
    if (err) {
      // TODO: set up logic to handle unauthenticated user
      next();
    } else {
      next();
    }
  });
};

module.exports = sessionController;
