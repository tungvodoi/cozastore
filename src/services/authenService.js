let UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { transErrors, transSuccess, transMail } = require('./../../lang/vi');
const sendMail = require('../config/mailer');

let register = (username, email, password, protocol, host) => {
  return new Promise(async (resolve, reject) => {
    let userByUserName = await UserModel.findUserByName(username);
    let userByUserEmail = await UserModel.findUserByEmail(email);
    if (userByUserName) {
      if (userByUserName.deleteAt != null) {
        return reject('Account removed');
      }
      if (!userByUserName.local.isActive) {
        return reject('Account not active');
      }
      return reject('User name in use');
    }
    if (userByUserEmail) {
      if (userByUserEmail.deleteAt != null) {
        return reject('Sccount removed');
      }
      if (!userByUserEmail.local.isActive) {
        return reject('Account not active');
      }
      return reject('User name in use');
    }

    let saltRounds = 7;
    let salt = bcrypt.genSaltSync(saltRounds);
    let newUser = {
      username: username,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        verifyToken: uuid.v4(),
      },
    };
    let user = await UserModel.createNew(newUser);
    //Send mail
    let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
    sendMail(email, transMail.subject, transMail.template(linkVerify))
      .then((success) => resolve(transSuccess.userCreated(user.local.email)))
      .catch(async (error) => {
        console.log(error);
        await UserModel.removeById(user._id);
        reject(transMail.send_failed);
      });
    // resolve('Register success, you can login now');
  });
};
let verifyAccount = (token) => {
  return new Promise(async (relsove, reject) => {
    let userByToken = await UserModel.findByToken(token);
    if (!userByToken) {
      reject(transErrors.token_undefinded);
    }
    await UserModel.verify(token);
    relsove(transSuccess.account_actived);
  });
};
module.exports = {
  register,
  verifyAccount,
};
