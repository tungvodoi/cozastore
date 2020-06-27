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
  let name = req.body.name;
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
        productName: name,
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
let getShoppingCart = async (req, res) => {
  let cartProducts = [];
  let total;
  let cart = req.session.cart;
  try {
    let productDetail = await productService.getProductDetail(req.params.id);
    //Cart
    if (req.user) {
      let userUpdated = await UserModel.findUserById(req.user._id);
      cart = userUpdated.cart;
    }

    if (cart) {
      total = await cartService.calculateTotals(cart);
      cartProducts = await cartService.getCart(cart);
    }

    res.render('shopping-cart', {
      productDetail,
      cart: { cartProducts, total },
      user: req.user ? req.user : null,
    });
  } catch (error) {
    console.log(error);
    res.render('shopping-cart');
  }
};
module.exports = {
  addToCart,
  removeFromCart,
  getShoppingCart,
};
