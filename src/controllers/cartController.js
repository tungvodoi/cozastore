let ProductModel = require('../models/productModel');
let UserModel = require('../models/userModel');
let { cartService, productService } = require('../services/index');
const uuid = require('uuid');
const userModel = require('../models/userModel');
let addToCart = async (req, res) => {
  let productAddToCart = {};
  let productId = req.body.productId;
  let quantity = parseInt(req.body.quantity);
  let size = req.body.size;
  let color = req.body.color;
  let newQuantity = null;
  try {
    if (req.user) {
      let user = await UserModel.findUserById(req.user._id);
      if (cartService.inCart(user.cart, productId, size, color)) {
        let productExists = await cartService.increseQuantityUser(
          user._id,
          user.cart,
          productId,
          quantity,
          size,
          color
        );
        return res.status(200).send({ exists: true, productExists });
      }
      let product = await ProductModel.findProductById(productId);
      let { productName, price, images } = product;
      let subProductId = uuid.v4();
      productAddToCart = {
        productName,
        productId,
        subProductId,
        quantity,
        size,
        color,
        price,
        images,
      };
      await cartService.addToCartUser(req.user._id, productAddToCart);
    } else {
      // If not exits session cart
      if (!req.session.cart) {
        req.session.cart = [];
      } else if (cartService.inCart(req.session.cart, productId, size, color)) {
        //If product exists in cart
        let productExists = cartService.increseQuantitySession(
          req.session.cart,
          productId,
          quantity,
          size,
          color
        );
        return res.status(200).send({ exists: true, productExists });
      }
      let subProductId = uuid.v4();
      req.session.cart.push({
        productId,
        subProductId,
        quantity,
        size,
        color,
      });
      let product = await ProductModel.findProductById(productId);
      let { productName, price, images } = product;
      productAddToCart = {
        productName,
        productId,
        subProductId,
        quantity,
        size,
        color,
        price,
        images,
      };
    }

    res.status(200).send(productAddToCart);
  } catch (error) {
    console.log(error);
    res.status(501);
  }
};
let removeFromCart = async (req, res) => {
  let subProductId = req.body.subProductId;
  try {
    if (req.user) {
      await cartService.removeFromCartUser(req.user._id, subProductId);
    } else {
      req.session.cart = req.session.cart.filter(
        (product) => product.subProductId != subProductId
      );
    }
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(501);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
};
