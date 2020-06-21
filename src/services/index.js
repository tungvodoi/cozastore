let getHome = require('./homeService');
let productService = require('./productService');
let orderService = require('./orderService');
let cartService = require('./cartService');

module.exports = {
  homeService: getHome,
  productService,
  orderService,
  cartService,
};
