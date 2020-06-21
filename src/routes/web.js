const express = require('express');
const path = require('path');

const {
  homeController,
  productController,
  cartController,
} = require('../controllers/index');
const initRoutesAdmin = require('./admin/index');

/**
 * Init all routes
 * @param {app} app
 */
const initRoutes = (app) => {
  //Init router admin
  initRoutesAdmin(app);

  //Get cart
  // app.get('*', (req, res, next) => {
  //   if (!req.session.cart) {
  //     req.session.cart = {
  //       items: {},
  //       total: 0,
  //     };
  //   }
  //   next();
  // });
  // Home router
  app.get('/', homeController.getHome);

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
