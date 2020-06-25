let getHome = require('./homeService');
let productService = require('./productService');
let orderService = require('./orderService');
let cartService = require('./cartService');
let authenService = require('./authenService');
let userService = require('./userService');

module.exports = {
  homeService: getHome,
  productService,
  orderService,
  cartService,
  authenService,
  userService,
};
