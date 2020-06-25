const UserModel = require('../models/userModel');
const { authenService } = require('../services');

let register = async (req, res) => {
  let successArr = [];
  let errorsArr = [];
  try {
    let createUserStatus = await authenService.register(
      req.body.username,
      req.body.email,
      req.body.password
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
module.exports = {
  register,
  logout,
};
