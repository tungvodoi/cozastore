const { transSuccess } = require('../../../lang/vi');
const ProductModel = require('../../models/productModel');
let addProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      newProduct.sizes = newProduct.sizes.split(',');
      newProduct.colors = newProduct.colors.split(',');

      newProduct.dimensions = {
        length: newProduct.length,
        width: newProduct.width,
        height: newProduct.height,
      };
      let newItem = await ProductModel.createNew(newProduct);

      console.log(newProduct);
      resolve(transSuccess.add_product);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  addProduct,
};
