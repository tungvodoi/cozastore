const express = require('express');
const {
  categoryValidation,
  productValidation,
} = require('../validation/admin/index');
const {
  adminCategory,
  adminProduct,
  adminOrder,
} = require('../controllers/adminController/index');

const adminRouter = express.Router();
//Home

adminRouter.get('/', (req, res) => {
  res.render('admin/');
})

// Product
adminRouter.get('/product', adminProduct.getProducts);
adminRouter.get('/product/edit/:id', adminProduct.getEditProduct);

adminRouter.post(
  '/add-product',
  adminProduct.uploadImages,
  productValidation.addProduct,
  adminProduct.addProduct
);
adminRouter.post(
  '/edit-product',
  adminProduct.uploadImages,
  productValidation.editProduct,
  adminProduct.updateProduct
);
adminRouter.post('/delete-product-image', adminProduct.deleteProductImage);
adminRouter.post('/delete-product', adminProduct.deleteProduct);


// Category
adminRouter.get('/category', adminCategory.getCategory);
adminRouter.get('/add-category', adminCategory.getAddingCategory);

adminRouter.post(
  '/add-category',
  categoryValidation.addCategory,
  adminCategory.addCategory
);
adminRouter.post('/get-sub-category', adminCategory.getSubCategory);
adminRouter.post(
  '/get-category-and-sub',
  adminCategory.getCategoryAndSubCategory
);

//Order
adminRouter.get('/order', adminOrder.getOrder);
module.exports = { adminRouter };
