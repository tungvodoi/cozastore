const session = require('express-session');

let configSession = (app) => {
  app.use(
    session({
      name: process.env.SESSION_NAME || 'express.sid',
      secret: process.env.SESSION_SECRET || 'ahihi',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 day
      },
    })
  );
};
module.exports = configSession;
