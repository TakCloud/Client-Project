const bcrypt = require('bcryptjs');
const path = require('path')
const messageController = require('./messageController')

const loginSignupController = {
  temporaryDB: []
};

loginSignupController.getAllUsers = (req,res,next) => {
  console.log(loginSignupController.temporaryDB, 'this is this')
  return res.send(loginSignupController.temporaryDB)
};

loginSignupController.createUser = (req, res, next) => {
  let obj = {
    user: req.body.user,
    pass: req.body.pass
  }
  loginSignupController.temporaryDB.push(obj)
  console.log(loginSignupController.temporaryDB, 'this is addition to temp usersdb')
  next()
};

loginSignupController.deleteAllUsers = () => {
  loginSignupController.temporaryDB = []
};
loginSignupController.verifyUser = (req, res, next) => {
  console.log(req.body, 'this is to verify user')
  console.log(loginSignupController.temporaryDb, 'this is to loginSignupController.temporaryDb')
  next()
  // for(let i = 0; i < loginSignupController.temporaryDB.length; i++) {
  //   if(loginSignupController.temporaryDb[i].user === req.body.user) {
  //     next()
  //   } else {
  //     res.redirect('/signup')
    // }
  }
module.exports = loginSignupController;