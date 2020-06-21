let { transSuccess, transErrors } = require('./../../../lang/vi');
let CategoryModel = require('./../../models/categoryModel');

const addCategory = (categoryName, subCategoryName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // add category
      let newCategory = await CategoryModel.findCategoryByName(categoryName);
      if (!newCategory) {
        newCategory = { categoryName };
        newCategory = await CategoryModel.createNew(newCategory);
      } else if (categoryName && !subCategoryName) {
        resolve(transErrors.add_category_exitst);
      } else {
        // add subcategory
        //if not exists subcatecory
        let newSubCategory = await CategoryModel.findSubCategoryByName(
          subCategoryName
        );
        if (!newSubCategory) {
          newSubCategory = {
            categoryName: subCategoryName,
            parentCategoryId: newCategory._id,
          };
          newSubCategory = await CategoryModel.createNew(newSubCategory);
        } else {
          resolve(transErrors.add__sub_category_exitst);
        }
      }

      // let test1 = await CategoryModel.findCategoryByName('tung');
      // console.log(test);
      // console.log(test1);
      // let newCategory = { categoryName: category };
      // newCategory = await CategoryModel.createNew(newCategory);
      // if (subCategory) {
      // let newSubCategory = {
      //   categoryName: subCategory,
      //   parentCategoryId: newCategory._id,
      // };
      //   await CategoryModel.createNew(newSubCategory);
      //   console.log(newSubCategory);
      // }
      resolve(transSuccess.add_category);
    } catch (error) {
      console.log(error);
      reject(transErrors.add_category);
    }
  });
};
const getSubCategory = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(keyword);
      let listCategory = CategoryModel.findSubCategoryLimit(keyword, 10);
      resolve(listCategory);
    } catch (error) {
      console.log(error);
      reject(transErrors.add_category);
    }
  });
};
const getCategoryAndSubCategory = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categoryAndSubcategory = [];
      let listSubCategory = await CategoryModel.findSubCategoryLimit(
        keyword,
        10
      );

      await Promise.all(
        listSubCategory.map(async (subCategory) => {
          let categoryName = await CategoryModel.findCategoryById(
            subCategory.parentCategoryId
          );
          categoryAndSubcategory.push({
            category: categoryName.categoryName,
            subCategory: subCategory.categoryName,
          });
          return categoryAndSubcategory;
        })
      );
      resolve(categoryAndSubcategory);
    } catch (error) {
      console.log(error);
      reject(transErrors.add_product);
    }
  });
};
module.exports = {
  addCategory,
  getSubCategory,
  getCategoryAndSubCategory,
};
