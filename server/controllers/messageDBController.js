const inbox = require('./inboxReader');

console.log('These are your inbox Messages: ', inbox.messages);
console.log('These are your inbox Threads: ', inbox.threads);
console.log('These are your inbox HistoryObjects: ', inbox.threads);

module.exports = inbox.threads;
