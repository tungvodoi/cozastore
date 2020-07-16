let ProductModel = require('../models/productModel');
const { transSuccess, transErrors } = require('../../lang/vi');
const productModel = require('../models/productModel');

let getProductDetail = (productId) => {
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
let getProducts = () => {
  return new Promise(async (resolve, reject) => {
    let products = await ProductModel.findAllProducts();
    resolve(products);
  });
};
let addProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
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

    await ProductModel.createNew(newProduct);

    resolve(transSuccess.add_product);
  });
};
let updateProduct = (productUpdate) => {
  return new Promise(async (resolve, reject) => {
    let product_attr = [];
    productUpdate.colors.forEach((productColor, index) => {
      product_attr.push({
        color: productColor,
        size: productUpdate.sizes[index],
        quantity: productUpdate.quantity[index],
      });
    });
    delete productUpdate.colors;
    delete productUpdate.sizes;
    delete productUpdate.quantity;
    productUpdate.product_attr = product_attr;
    productUpdate.dimensions = {
      length: productUpdate.length,
      width: productUpdate.width,
      height: productUpdate.height,
    };
    let statusUpdateImages = await productModel.updateProductImages(
      productUpdate
    );
    delete productUpdate.images;
    let statusUpdateProduct = await productModel.updateProduct(productUpdate);
    if (
      statusUpdateProduct.nModified == 1 ||
      statusUpdateImages.nModified == 1
    ) {
      resolve(transSuccess.editProduct);
    } else {
      reject(transErrors.editProduct);
    }
  });
};
let deleteProductImage = (productId, linkImage) => {
  return new Promise(async (resolve, reject) => {
    let statusDelete = await ProductModel.deleteImage(productId, linkImage);
    if (statusDelete.nModified === 1) {
      statusDelete = true;
      resolve(statusDelete);
    } else {
      reject(transErrors.delete_product_image);
    }
  });
};
let deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    let statusDelete = await ProductModel.deleteProduct(productId);
    if (statusDelete.deletedCount == 1) {
      statusDelete = true;
      resolve(statusDelete);
    } else {
      reject(transErrors.delete_product);
    }
  });
};
let getSizeByColor = (productId, color) => {
  return new Promise(async (resolve, reject) => {
    let sizes = await ProductModel.getSizeByColor(productId, color);
    resolve(sizes);
  });
};
let getColorBySize = (productId, size) => {
  return new Promise(async (resolve, reject) => {
    let colors = await ProductModel.getColorBySize(productId, size);
    resolve(colors);
  });
};
module.exports = {
  addProduct,
  getProductDetail,
  findProductById,
  getProducts,
  updateProduct,
  deleteProductImage,
  deleteProduct,
  getSizeByColor,
  getColorBySize,
};
