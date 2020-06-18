const express = require('express');
const { categoryValidation } = require('../../validation/admin/index');
const { adminCategory } = require('../../controllers/adminController/index');

const categoryRouter = express.Router();
categoryRouter.get('/category', adminCategory.getCategory);
categoryRouter.get('/add-category', adminCategory.getAddingCategory);

categoryRouter.post(
  '/add-category',
  categoryValidation.addCategory,
  adminCategory.addCategory
);
categoryRouter.post('/get-sub-category', adminCategory.getSubCategory);
categoryRouter.post('/get-category-and-sub', adminCategory.getCategoryAndSubCategory);

module.exports = categoryRouter;
