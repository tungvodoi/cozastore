const express = require('express');
const path = require('path');
const passport = require('passport');

const {
  homeController,
  productController,
  cartController,
  authenController,
} = require('../controllers/index');
const { authValidation } = require('../validation/index');
const initRoutesAdmin = require('./admin/index');

const initPassportLocal = require('../controllers/passportController/local');

//Init passport
initPassportLocal();
/**
 * Init all routes
 * @param {app} app
 */
const initRoutes = (app) => {
  //Init router admin
  initRoutesAdmin(app);

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
  app.get('/logout', authenController.logout);

  // Product router
  app.get('/product', (req, res) => {
    res.send('dmm');
  });
  app.get('/product/:id', productController.getProductDetail);

  // Cart router
  app.post('/add-to-cart', cartController.addToCart);
  app.post('/remove-from-cart', cartController.removeFromCart);
};
module.exports = initRoutes;
