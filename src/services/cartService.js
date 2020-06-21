let ProductModel = require('../models/productModel');

let getCart = (cartProducts) => {
  return new Promise(async (resolve, reject) => {
    let listProducts = [];
    for (let i = 0; i < cartProducts.length; i++) {
      let product = await ProductModel.findProductById(
        cartProducts[i].productId
      );
      product.quantity = cartProducts[i].quantity;
      listProducts.push(product);
    }
    resolve(listProducts);
  });
};
let addToCart = (productId) => {
  return new Promise(async (resolve, reject) => {
    let product = await ProductModel.findProductById(productId);
    resolve(product);
  });
};
let inCart = (cartProducts, productId, quantity = 0) => {
  let found = false;
  cartProducts.forEach((product) => {
    if (product.productId === productId) {
      product.quantity += parseInt(quantity);
      found = true;
    }
    return product;
  });

  return found;
};
let calculateTotals = async (cart) => {
  return new Promise(async (resolve, reject) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      let product = await ProductModel.findProductById(cart[i].productId);
      let price = parseInt(product.price);
      let qty = parseInt(cart[i].quantity);

      total += price * qty;
    }
    resolve(total);
  });
};
let removeFromCart = async (cartProducts, productId) => {
  return new Promise(async (resolve, reject) => {
    cartProducts = cartProducts.filter(product => product.productId != productId);
    resolve(true);
  });
};

module.exports = {
  addToCart,
  getCart,
  inCart,
  calculateTotals,
  removeFromCart,
};
