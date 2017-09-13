// let Session = require('./../models/sessionModel');
// let sessionController = {};

// sessionController.isLoggedIn = function(req, res, next) {
//   if(res.ssid) {
//     console.log(res.ssid, 'this is isloggedin res.id')
//     Session.find({cookieId: res.ssid}, (err, data) => {
//       console.log(data, " this is what happens if logged in")
//       if(err) throw err;
//       console.log('user is logged in ', data)
//       return !data.length ? res.redirect('/signup') : next();
//     })
//   } else {
//     res.redirect('/signup')
//     // sessionController.startSession()
//   }
// };

// sessionController.startSession = function(req, res, next) {
//   if(res.ssid) {
//     Session.find({cookieId: res.ssid}, (err,data) => {   
//       if(err) throw err;
//       console.log(res.ssid, ' startSession controller was hit')
//       console.log(data, 'this is the sessionController data')
//       if(!data.length){
//         Session.create({cookieId:res.ssid}, (err,date) => {
//         console.log('old session was lost, new one created', date.cookieId)
//         if (err) throw err;
//         else next()
//       })}
//       else{
//         console.log(data[0].cookieId, " user is loggedIn restore session") 
//         next()
//       }
//     })
//   } else{
//     Session.create({cookieId:res.ssid}, (err) => {
//       console.log('completely new session, no old sesion', data)
//       if (err) throw err;
//       else next()
//     })
//     // res.redirect()
//   }
// }
// module.exports = sessionController;