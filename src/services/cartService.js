let ProductModel = require('../models/productModel');
let UserModel = require('../models/userModel');

let getCart = (cartProducts) => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < cartProducts.length; i++) {
      let product = await ProductModel.findProductById(
        cartProducts[i].productId
      );
      cartProducts[i].price = product.price;
      cartProducts[i].images = product.images;
    }

    resolve(cartProducts);
  });
};
let addToCartUser = async (userId, product) => {
  return await UserModel.addToCart(userId, product);
};
let inCart = (cart, productId, size, color) => {
  let found = false;
  cart.forEach((product) => {
    if (
      product.productId === productId &&
      product.size === size &&
      product.color === color
    ) {
      found = true;
    }
  });
  return found;
};
let increseQuantityUser = async (
  userId,
  cart,
  productId,
  quantity,
  size,
  color
) => {
  let productExists = null;
  await Promise.all(
    cart.map(async (product) => {
      if (
        product.productId === productId &&
        product.size === size &&
        product.color === color
      ) {
        product.quantity += parseInt(quantity);
        await UserModel.updateQuantityProduct(
          userId,
          product._id,
          product.quantity
        );
        productExists = {
          subProductId: product.subProductId,
          newQuantity: product.quantity,
        };

        return product;
      }
    })
  );
  return productExists;
};
let increseQuantitySession = (cart, productId, quantity, size, color) => {
  let productExists = null;
  cart.forEach((product) => {
    if (
      product.productId === productId &&
      product.size === size &&
      product.color === color
    ) {
      product.quantity += parseInt(quantity);
      productExists = {
        subProductId: product.subProductId,
        newQuantity: product.quantity,
      };
    }
  });
  return productExists;
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
    cartProducts = cartProducts.filter(
      (product) => product.productId != productId
    );
    resolve(true);
  });
};
let removeFromCartUser = async (userId, subProductId) => {
  return new Promise(async (resolve, reject) => {
    await UserModel.deleteProductInCart(userId, subProductId);
    resolve(true);
  });
};
module.exports = {
  addToCartUser,
  getCart,
  inCart,
  calculateTotals,
  removeFromCart,
  increseQuantitySession,
  increseQuantityUser,
  removeFromCartUser,
};
