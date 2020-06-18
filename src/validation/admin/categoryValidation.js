const { check } = require('express-validator');
const { transValidation } = require('../../../lang/vi');
let addCategory = [
  check('category', transValidation.category_incorrect).not().isEmpty().trim(),
  check('subcategory', transValidation.sub_category_incorrect).trim(),
];
module.exports = { addCategory };
