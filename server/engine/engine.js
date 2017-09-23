const models = require('./../dbmodels/dbmodels.js');
const buildTransport = require('./buildTransport.js');

const engine = {};

const mailEngine = () => {
  // find all pending emails in database that are past due 
  models.emails.findAll({
    where: {
      status: 'pending',
      $and: { send_at: { $lt: Date.now() } },
    },
  })
    .then((entries) => {
      // restructure entries format to make building/sending emails easier
      const rebuiltEntries = entries.reduce((acc, entry) => {
        if (!acc[entry.dataValues.from_user_id]) {
          acc[entry.dataValues.from_user_id] = [entry.dataValues];
        } else {
          acc[entry.dataValues.from_user_id].push(entry.dataValues);
        }
        return acc;
      }, {});
      const toBeSent = Object.entries(rebuiltEntries);
      // send each entry to have nodemailer transporter built for given user
      toBeSent.forEach((emailSet) => {
        buildTransport(emailSet);
      });
    })
    .catch((err) => {
      console.log(`Something went wrong when polling: ${err}`);
    });
};

// run engine at set interval of time (ex. every 30 mins);
engine.begin = () => {
  // adjust timeout to desired testing interval
  setInterval(mailEngine, 20000);
};

module.exports = engine;
