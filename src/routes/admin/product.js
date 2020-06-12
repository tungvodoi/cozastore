const express = require('express');

const { adminProduct } = require('../../controllers/adminController/index');

const productRouter = express.Router();
productRouter.get('/add-product', adminProduct.getAddingProduct);
productRouter.post(
  '/add-product',
  adminProduct.addProduct
);

module.exports = productRouter;
