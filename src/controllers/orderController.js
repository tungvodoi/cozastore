let UserModel = require('../models/userModel');
let {
  productService,
  cartService,
  orderService,
} = require('../services/index');

let getOder = async (req, res) => {
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
    res.render('order', {
      productDetail,
      cart: { cartProducts, total },
      user: req.user ? req.user : null,
    });
  } catch (error) {
    console.log(error);
    res.render('order');
  }
};
let createOrder = async (req, res) => {
  if (req.user.cart.length == 0) {
    req.flash('errors', `You don't have any product in your cart`);
    res.redirect('/shopping-cart');
  }
  let indexShippingAddress = req.body.shippingAddressIndex;
  let createOrderStatus = await orderService.createOrder(
    req.user._id,
    req.user.cart,
    req.user.shippingAddress[indexShippingAddress]
  );
  if (createOrderStatus) {
  }
  res.redirect('/order');
};
module.exports = {
  getOder,
  createOrder,
};
