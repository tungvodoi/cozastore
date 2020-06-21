let ProductModel = require('../models/productModel');
let addToCart = (productId) => {
  return new Promise(async (resolve, reject) => {
    let product = await ProductModel.findProductById(productId);
    resolve(product);
  });
};
let findProductById = (productId) => {
  return new Promise(async (resolve, reject) => {
    let product = await ProductModel.findProductById(productId);
    resolve(product);
  });
};
module.exports = {
  addToCart,
  findProductById,
};
