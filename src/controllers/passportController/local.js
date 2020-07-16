const passport = require('passport');
const passportLocal = require('passport-local');

const UserModel = require('../../models/userModel');
const { transErrors } = require('../../../lang/vi');

let LocalStrategy = passportLocal.Strategy;
const initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        try {
          let user = await UserModel.findUserByName(username);
          if (!user || user.role !== 'user') {
            return done(
              null,
              false,
              req.flash('errorLogin', transErrors.login_failed)
            );
          }
          if (!user.local.isActive) {
            return done(
              null,
              false,
              req.flash('errorLogin', transErrors.account_not_active)
            );
          }
          let checkPassword = user.comparePassword(password);
          if (!checkPassword) {
            return done(
              null,
              false,
              req.flash('errorLogin', transErrors.login_failed)
            );
          }
          if (req.session.cart && req.session.cart.length > 0) {
            await UserModel.addSessionToCart(user._id, req.session.cart);
          }
          req.session.cart = [];
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error, req.flash('errorLogin', transErrors.server_error));
        }
      }
    )
  );
  //Save user id to session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  //This is called by passport.session()
  //return userInfo to req.user
  passport.deserializeUser((id, done) => {
    UserModel.findUserById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error, null);
      });
  });
};
module.exports = initPassportLocal;
