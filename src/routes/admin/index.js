const express = require('express');
const productRouter = require('./product');

const initRoutesAdmin = (app) => {
  app.get('/admin', (req, res) => {
    res.render('admin/');
  });
  app.use('/admin', productRouter);
};
module.exports = initRoutesAdmin;
