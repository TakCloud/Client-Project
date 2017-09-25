const gmail = require('./OauthReaderController');

const threads = [];
const messages = [];
const history = [];

gmail.users.messages.list({ userId: 'cheatcodes001@gmail.com', includeSpamTrash: true }, (err, results) => {
  if (err) console.log('there was an error');
  if (results) {
    for (let i = 0; i < results.messages.length; i += 1) {
      messages.push(results.messages[i]);
    }
    // console.log('MY MESSAGESLENGTH: ', messages.length);
    // console.log('MY MESSAGES: ', messages);
  }
});
gmail.users.threads.list({ userId: 'cheatcodes001@gmail.com', includeSpamTrash: true }, (err, response) => {
  if (err) console.log('there was an error2');
  if (response) {
    response.threads.forEach((THREAD) => {
      threads.push(THREAD);
      // console.log(`THREAD HEADER, ${THREAD.snippet}: \n threadID: ${THREAD.id}`);
    });
    // console.log('MY THREADSLENGTH: ', threads.length);
    // if response.threads[i].snippet.match(/[Address was not found]+/gi)
    // {remove from campaign}
  }
});
gmail.users.history.list({ userId: 'cheatcodes001@gmail.com', startHistoryId: '1000', includeSpamTrash: true, maxResults: 200 }, (err, data) => { //  START HISTORY NEEDS TO BE INCREMENTED TO MOST RECENT HISTORY ID - 100
  if (err) console.log(err);
  if (data) {
    data.history.forEach((msgHistory) => {
      // if (msgHistory.labelsRemoved) { history.push(msgHistory.labelsRemoved[0]); }
      if (msgHistory) { history.push(msgHistory.messagesAdded); }
      if (msgHistory.labelsRemoved) {
        // console.log(`labelsRemoved from threadID  ${msgHistory.messages[0].threadId}`,
        //  msgHistory.labelsRemoved[0].message.labelIds);
        // history.push(msgHistory.labelsRemoved[0].message.labelIds)
      }
      if (msgHistory.labelsAdded) {
        // console.log(`labelsAdded to threadID  ${msgHistory.messages[0].threadId}`,
        //  msgHistory.labelsAdded[0].message.labelIds);
        // history.push(msgHistory.labelsRemoved[0].message.labelIds)

      }
      if (msgHistory.messagesAdded) {
        // console.log(`messagesAdded to threadId  ${msgHistory.messages[0].threadId}`,
        //  `${msgHistory.messagesAdded[0].message.labelIds} `);
        // history.push(msgHistory.labelsRemoved[0].message.labelIds)

      }
      if (msgHistory.messages) {
        // console.log(`historyid: ${msgHistory.id}`, `threadid: ${msgHistory.messages[0].threadId}`, `messageId: ${msgHistory.messages[0].id}`);
        // history.push(msgHistory.labelsRemoved[0].message.labelIds)

      }
      // console.log('MY MESSAGES: ', messages);
    });
  }
});

module.exports = { messages, threads, history };
