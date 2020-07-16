const UserModel = require('../models/userModel');
const { authenService } = require('../services/');
const { validationResult } = require('express-validator');

let register = async (req, res) => {
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash('errorRegister', errorsArr);
    return res.redirect('/');
  }
  try {
    let createUserStatus = await authenService.register(
      req.body.username,
      req.body.email,
      req.body.password,
      req.protocol,
      req.get('host')
    );
    req.flash('registerSuccess', createUserStatus);
    return res.redirect('/');
  } catch (error) {
    errorsArr.push(error);
    req.flash('errorRegister', errorsArr);
    return res.redirect('/');
  }
};
let logout = (req, res) => {
  req.session.cart = [];
  req.logout();
  res.redirect('/');
};
let checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('errorLogin', 'You have to login first');
    return res.redirect('/');
  }
  next();
};
const verifyAccount = async (req, res) => {
  let errorsArr = [];
  try {
    const verifyStatus = await authenService.verifyAccount(req.params.token);
    req.flash("registerSuccess", verifyStatus);
    return res.redirect("/");
  } catch (error) {
    errorsArr.push(error);
    req.flash("errors", errorsArr);
    return res.redirect("/");
  }
};
let checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};
module.exports = {
  register,
  logout,
  checkLoggedIn,
  checkLoggedOut,
  verifyAccount,
};
