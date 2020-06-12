const express = require('express');
const userRoutes = require('./user');
const initRoutesAdmin = require('./admin/index');
const productRoutes = require('./product');

let router = express.Router();
/**
 * Init all routes
 * @param {app} app
 */
const initRoutes = (app) => {
  //Init router admin
  initRoutesAdmin(app);

  app.get('/', (req, res) => {
    res.render('index');
  });
  //   app.use('/user', userRoutes);
  app.use('/product', productRoutes);
};
module.exports = initRoutes;
