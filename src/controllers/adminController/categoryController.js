const { validationResult } = require('express-validator');
let { transSuccess, transErrors } = require('./../../../lang/vi');
let { categoryService } = require('./../../services/admin/index');
let getCategory = (req, res) => {};
let getAddingCategory = (req, res) => {
  res.render('admin/add-category');
};
let addCategory = async (req, res) => {
  let errorsArr = [];
  //Validation
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((error) => {
      errorsArr.push(error.msg);
    });
  }

  try {
    // add category
    let categoryName = req.body.category;
    let subCategoryName = req.body.subCategory;

    let statusAddCategory;
    if (!errorsArr.length) {
      statusAddCategory = await categoryService.addCategory(
        categoryName,
        subCategoryName
      );
    }
    res.render('admin/add-category', {
      errors: errorsArr,
      success: statusAddCategory,
    });
  } catch (error) {
    console.log(error);
    res.render('admin/add-category', { errors: errorsArr });
  }
};
let getSubCategory = async (req, res) => {
  try {
    let keyword = req.body.keyword;
    let listCategory = await categoryService.getSubCategory(keyword);
    res.status(200).send(listCategory);
  } catch (error) {
    console.log(error);
    res.render('admin/add-category', { errors: statusAddCategory });
  }
};
let getCategoryAndSubCategory = async (req, res) => {
  try {
    let keyword = req.body.keyword;
    let categoryAndSubCategory = await categoryService.getCategoryAndSubCategory(
      keyword
    );
    res.status(200).send(categoryAndSubCategory);
  } catch (error) {
    console.log(error);
    res.status(501).send(error);
  }
};
module.exports = {
  getCategory,
  getAddingCategory,
  addCategory,
  getSubCategory,
  getCategoryAndSubCategory,
};
