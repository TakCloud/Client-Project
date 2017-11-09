// creates connection to database
const Sequelize = require('sequelize');

console.log(process.env.NODE_ENV, 'THIS IS PROCESS ENV NODE');
let sequelURL;
if (process.env.NODE_ENV === 'testing') {
  sequelURL = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
} else {
  sequelURL = 'postgres://rawnwiga:KmvRb_bLjALCFuJ5-rf1QXx_qY0ywtYm@babar.elephantsql.com:5432/rawnwiga';
}
// uncomment below for testing! 
// sequelURL = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
console.log(process.env.NODE_ENV);
console.log(sequelURL);
module.exports = new Sequelize(sequelURL, {
  dialect: 'postgres',
});
// INNER JOIN: select * from users join emails on users.user_id = emails.sent_by_user_id
// OUTTER LEFT JOIN: select * from users left outer join emails on users.user_id = emails.sent_by_user_id
