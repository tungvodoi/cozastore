let UserModel = require('../models/userModel');
let { productService, cartService } = require('../services/index');

let getProductDetail = async (req, res) => {
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
    res.render('product-detail', {
      productDetail,
      cart: { cartProducts, total },
      user: req.user ? req.user : null,
    });
  } catch (error) {
    console.log(error);
    res.render('product-detail');
  }
};
let getSizeByColor = async (req, res) => {
  let productId = req.body.productId;
  let color = req.body.color;
  try {
    let sizes = await productService.getSizeByColor(productId, color);
    res.status(200).send(...sizes);
  } catch (error) {
    console.log(error);
    res.status(501).send('Cannot get size');
  }
};
let getColorBySize = async (req, res) => {
  let productId = req.body.productId;
  let size = req.body.size;
  try {
    let colors = await productService.getColorBySize(productId, size);
    res.status(200).send(...colors);
  } catch (error) {
    console.log(error);
    res.status(501).send('Cannot get size');
  }
};
module.exports = { getProductDetail, getSizeByColor, getColorBySize };
