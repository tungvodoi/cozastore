const express = require('express');
const productRouter = require('./product');
const categoryRouter = require('./category');

const initRoutesAdmin = (app) => {
  app.get('/admin', (req, res) => {
    res.render('admin/');
  });
  app.use('/admin', productRouter);
  app.use('/admin', categoryRouter);
};
module.exports = initRoutesAdmin;
