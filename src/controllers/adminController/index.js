const productController = require('./productController');
const categoryController = require('./categoryController');
module.exports = {
  adminProduct: productController,
  adminCategory: categoryController,
};
