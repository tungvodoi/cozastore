const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const connection = mongoose.createConnection(
  `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let configSession = (app) => {
  let sess = {
    name: process.env.SESSION_NAME || 'express.sid',
    secret: process.env.SESSION_SECRET || 'ahihi',
    store: new MongoStore({ mongooseConnection: connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1 day
    },
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
  }
  app.use(session(sess));
};
module.exports = configSession;
