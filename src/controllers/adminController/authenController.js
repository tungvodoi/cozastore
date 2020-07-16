const { transErrors } = require('../../../lang/vi');
const UserModel = require('../../models/userModel');
let getHome = (req, res) => {
  res.render('admin/login', { errorLogin: req.flash('errorLogin') });
};
let login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    let user = await UserModel.findUserByName(username);
    if (!user || user.role !== 'admin') {
      req.flash('errorLogin', transErrors.login_failed);
    } else {
      let checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        req.flash('errorLogin', transErrors.login_failed);
      } else {
        req.admin = user;
        req.session.admin = user._id;
      }
    }

    res.redirect('/admin');
  } catch (error) {
    console.log(error);
    req.flash('errorLogin', transErrors.login_failed);
    res.redirect('/admin/login');
  }
};
let checkLoggedIn = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};
let checkLoggedOut = (req, res, next) => {
  if (req.session.admin) {
    res.redirect('/admin');
  } else {
    next();
  }
};
let logout = (req, res) => {
  req.session.admin = null;
  req.admin = null;
  res.redirect('/admin/login');
};
module.exports = {
  getHome,
  login,
  checkLoggedIn,
  checkLoggedOut,
  logout,
};
