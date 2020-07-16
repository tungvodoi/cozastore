const productController = require('./productController');
const categoryController = require('./categoryController');
const orderController = require('./orderController');
const authenController = require('./authenController');
module.exports = {
  adminProduct: productController,
  adminCategory: categoryController,
  adminOrder: orderController,
  adminAuth: authenController,
};
