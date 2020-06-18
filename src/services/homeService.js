let ProductModel = require('../models/productModel');
let getHome = () => {
  return new Promise(async (resolve, reject) => {
    let products = await ProductModel.findProductLimit(10);
    resolve(products);
  });
};

module.exports = {
  getHome,
};
