const { check } = require('express-validator');
const { transValidation } = require('../../lang/vi');
let register = [
  check('username', transValidation.username_invalid).isLength({ min: 4 }).trim(),
  check('email', transValidation.email_invalid).isEmail().trim(),
  check('password',transValidation.password_invalid)
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
    ),
  check(
    'password_confirmation',
    transValidation.password_confirmation_inccorect
  ).custom((value, { req }) => {
    return value === req.body.password;
  }),
];
module.exports = { register };
