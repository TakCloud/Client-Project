const bcrypt = require('bcrypt');

module.exports = (req, res) => {
  const password = '1234';
  console.log(req.body, ' this is the req on login');
  // we need logic to query database for a match with req.body.username
  // we then need to run bcrypt.compare with the password property on
  // the object returned from the query
  if (!password) return res.redirect('/signup'); // replace password w/ SQL USER match
  bcrypt.compare(req.body.password, '$2a$10$rSp9sZs/IunThh/SeFCMB.nXqmuj.hM5ZRC02BXtFdGJh88oW3hMi', (err, resp) => {
    if (err) throw err;
    else {
      console.log('bcrypt has made a match: ', resp);
      return !resp ? res.redirect('/signup') : res.send(resp);
    }
  });
  return null;
};

/*
  refactor to grab password from database instead
*/
