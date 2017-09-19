const url = require('./oauthCreator').url;

module.exports = (req, res) => {
  //  response is sending the authURL to the frontend so that
  //  the front end can call window.location on the authURL
  res.locals.authUrl = url;
  console.log('This url was passed to the front end: ', url, '\n');
  res.send(res.locals);
  //  // ya29.GlvGBLM2AiDJtPAHO1m_BMSIg2GATfVyec4t7mseOmpvxa4EQyoRZhUn2Sulkp7FV-8T
  // AgzdAFecy43LeLjM3US21XYWnR1FKUaB0hAOGU53yuFuSNCYREDd6m44 //another example of an access token
  //  the refresh token is acutally producing new access tokens every time
};
