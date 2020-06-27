const productController = require('./productController');
const categoryController = require('./categoryController');
const orderController = require('./orderController');
module.exports = {
  adminProduct: productController,
  adminCategory: categoryController,
  adminOrder: orderController,
};
