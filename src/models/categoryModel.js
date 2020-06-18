const mongoose = require('mongoose');
const categoryModel = new mongoose.Schema({
  categoryName: String,
  parentCategoryId: { type: String, default: null },
});
categoryModel.statics = {
  createNew(category) {
    return this.create(category);
  },
  findCategoryByName(categoryName) {
    return this.findOne({
      $and: [
        { categoryName: categoryName },
        { parentCategoryId: { $eq: null } },
      ],
    }).exec();
  },
  findCategoryById(categoryId) {
    return this.findOne({
      $and: [
        { _id: categoryId },
        { parentCategoryId: { $eq: null } },
      ],
    }).exec();
  },
  findSubCategoryByName(subCategoryName) {
    return this.findOne({
      $and: [
        { categoryName: subCategoryName },
        { parentCategoryId: { $ne: null } },
      ],
    });
  },
  findSubCategoryLimit(keyword, limit) {
    return this.find({
      $and: [
        { categoryName: { $regex: new RegExp(keyword, 'i') } },
        { parentCategoryId: { $ne: null } },
      ],
    }).limit(limit);
  },
  findCategoriesByNameLimit(keyword, limit) {
    return this.find({
      categoryName: { $regex: new RegExp(keyword, 'i') },
    }).limit(limit);
  },
};
module.exports = mongoose.model('category', categoryModel);
