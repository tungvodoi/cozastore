const { check } = require('express-validator');
let { transValidation } = require('../../../lang/vi');
let addProduct = [
  check('productName', transValidation.add_product_name).isLength({ min: 4 }),
  check('price', transValidation.add_product_price).isNumeric(),
  check('colors', transValidation.add_product_color).notEmpty(),
  check('sizes', transValidation.add_product_size).notEmpty(),
  check('quantity', transValidation.add_product_quantity)
    .notEmpty()
    .isNumeric(),
  check('images', transValidation.add_product_images).notEmpty(),
];
let editProduct = [
  check('productName', transValidation.add_product_name).isLength({ min: 4 }),
  check('price', transValidation.add_product_price).isNumeric(),
  check('colors', transValidation.add_product_color).notEmpty(),
  check('sizes', transValidation.add_product_size).notEmpty(),
  check('quantity', transValidation.add_product_quantity)
    .notEmpty()
    .isNumeric(),
];
module.exports = { addProduct, editProduct };
