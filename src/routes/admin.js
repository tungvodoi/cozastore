const express = require('express');
const {
  categoryValidation,
  productValidation,
} = require('../validation/admin/index');
const {
  adminCategory,
  adminProduct,
  adminOrder,
  adminAuth,
} = require('../controllers/adminController/index');

const adminRouter = express.Router();

//Auth
adminRouter.get('/login', adminAuth.checkLoggedOut, adminAuth.getHome);
adminRouter.post('/login', adminAuth.checkLoggedOut, adminAuth.login);
adminRouter.get('/logout', adminAuth.logout);
//Home
adminRouter.get('/', adminAuth.checkLoggedIn, (req, res) => {
  res.render('admin/');
});

// Product
adminRouter.get('/product', adminAuth.checkLoggedIn, adminProduct.getProducts);
adminRouter.get(
  '/product/edit/:id',
  adminAuth.checkLoggedIn,
  adminProduct.getEditProduct
);

adminRouter.post(
  '/add-product',
  adminAuth.checkLoggedIn,
  adminProduct.uploadImages,
  productValidation.addProduct,
  adminProduct.addProduct
);
adminRouter.post(
  '/edit-product',
  adminAuth.checkLoggedIn,
  adminProduct.uploadImages,
  productValidation.editProduct,
  adminProduct.updateProduct
);
adminRouter.post(
  '/delete-product-image',
  adminAuth.checkLoggedIn,
  adminProduct.deleteProductImage
);
adminRouter.post(
  '/delete-product',
  adminAuth.checkLoggedIn,
  adminProduct.deleteProduct
);

// Category
adminRouter.get(
  '/category',
  adminAuth.checkLoggedIn,
  adminCategory.getCategory
);
adminRouter.get(
  '/add-category',
  adminAuth.checkLoggedIn,
  adminCategory.getAddingCategory
);

adminRouter.post(
  '/add-category',
  adminAuth.checkLoggedIn,
  categoryValidation.addCategory,
  adminCategory.addCategory
);
adminRouter.post(
  '/get-sub-category',
  adminAuth.checkLoggedIn,
  adminCategory.getSubCategory
);
adminRouter.post(
  '/get-category-and-sub',
  adminAuth.checkLoggedIn,
  adminCategory.getCategoryAndSubCategory
);
adminRouter.post(
  '/accept-order',
  adminAuth.checkLoggedIn,
  adminOrder.acceptOrder
);
adminRouter.post(
  '/finish-order',
  adminAuth.checkLoggedIn,
  adminOrder.finishOrder
);
adminRouter.post(
  '/delete-order',
  adminAuth.checkLoggedIn,
  adminOrder.deleteOrder
);

//Order
adminRouter.get('/order', adminAuth.checkLoggedIn, adminOrder.getOrder);
module.exports = { adminRouter };
