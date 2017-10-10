# Musuubis

### Send e-mails from Node.js – easy as cake! 🍰✉️

See https://firstfreightdemo.azurewebsites.net/ for documentation and terms.

### Having an issue?

First review the docs

Documentation for Musuubis can be found at https://firstfreightdemo.azurewebsites.net/

### Musuubis throws a SyntaxError for "..."

You are using older Node.js version than v6.0. Upgrade Node.js to get support for the spread operator

### Issues with Gmail

Gmail periodically revokes refresh tokens, causing campaigns to be halted until the user returns to our site and authenticates with Gmail to regrant us access to that user's accounts.

User's must ensure that the application has a valid refresh token in order for campaigns to be properly/sequentially sent.

Also, Gmail periodically changes its throttling rules. As of now, Gmail allows 500 recipients in a single email and no more than 500 emails in a day. Users may experience skips in campaign steps if these Gmail-updated throttle threshholds are hit.

#### More information on throttling can be found: 
1.) https://support.google.com/mail/answer/22839?hl=en 
2.) https://support.google.com/mail/answer/81126 

### I have a different problem

If you are having different issues with Nodemailer, then the best way to find help would be Stack Overflow or revisit the docs.

### We hope you like Musubis as much as we do!!
![](http://www.hawaiimagazine.com/sites/default/files/sites/default/files/spam-musubi-emoji.jpg)
