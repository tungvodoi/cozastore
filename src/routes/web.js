const express = require('express');
const passport = require('passport');

const {
  homeController,
  productController,
  cartController,
  authenController,
  orderController,
} = require('../controllers/index');
const initPassportLocal = require('../controllers/passportController/local');
const { authValidation } = require('../validation/index');

const { adminRouter } = require('./admin');

//Init passport
initPassportLocal();
/**
 * Init all routes
 * @param {app} app
 */
const initRoutes = (app) => {
  //Init router admin
  app.use('/admin', adminRouter);

  // Home router
  app.get('/', homeController.getHome);

  //Authen router
  app.post('/register', authValidation.register, authenController.register);
  app.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: true,
    })
  );
  app.get('/verify/:token', authenController.checkLoggedOut, authenController.verifyAccount);
  app.get('/logout', authenController.logout);

  // Product router
  app.get('/product/:id', productController.getProductDetail);
  app.post('/get-size-by-color', productController.getSizeByColor);
  app.post('/get-color-by-size', productController.getColorBySize);

  // Cart router
  app.post('/add-to-cart', cartController.addToCart);
  app.post('/remove-from-cart', cartController.removeFromCart);

  //Shopping cart
  app.get('/shopping-cart', cartController.getShoppingCart);

  //Order
  app.get('/order', authenController.checkLoggedIn, orderController.getOder);
  app.post('/order', authenController.checkLoggedIn, orderController.createOrder);
};
module.exports = initRoutes;
