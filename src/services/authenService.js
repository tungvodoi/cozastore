let UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

let register = (username, email, password) => {
  return new Promise(async (resolve, reject) => {
    let userByUserName = await UserModel.findUserByName(username);
    let userByUserEmail = await UserModel.findUserByEmail(email);
    if (userByUserName) {
      if (userByUserName.deleteAt != null) {
        reject('Account removed');
      }
      if (!userByUserName.local.isActive) {
        reject('Account not active');
      }
      reject('User name in use');
    }
    if (userByUserEmail) {
      if (userByUserEmail.deleteAt != null) {
        reject('Sccount removed');
      }
      if (!userByUserEmail.local.isActive) {
        reject('Account not active');
      }
      reject('User name in use');
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
    let user = UserModel.createNew(newUser);
    return resolve('Create user success');
  });
};
module.exports = {
  register,
};
