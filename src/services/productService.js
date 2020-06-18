let ProductModel = require('../models/productModel');

getProductDetail = (productId) => {
  return new Promise(async (resolve, reject) => {
    let product = await ProductModel.findById(productId);
    resolve(product);
  });
};
module.exports = { getProductDetail };
