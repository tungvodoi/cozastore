const { transSuccess } = require('../../../lang/vi');
const ProductModel = require('../../models/productModel');
let addProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product_attr = [];
      newProduct.colors.forEach((productColor, index) => {
        product_attr.push({
          color: productColor,
          size: newProduct.sizes[index],
          quantity: newProduct.quantity[index],
        });
      });
      delete newProduct.colors;
      delete newProduct.sizes;
      delete newProduct.quantity;
      newProduct.product_attr = product_attr;
      newProduct.dimensions = {
        length: newProduct.length,
        width: newProduct.width,
        height: newProduct.height,
      };

      let newItem = await ProductModel.createNew(newProduct);

      console.log(newItem);
      resolve(transSuccess.add_product);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  addProduct,
};
