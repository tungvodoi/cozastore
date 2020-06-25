let UserModel = require('../models/userModel');
let { homeService, cartService} = require('../services/index');

let getHome = async (req, res) => {
  let allProducts;
  let cartProducts = [];
  let total;
  let cart = req.session.cart;
  try {
    if (req.user) {
      let userUpdated = await UserModel.findUserById(req.user._id);
      cart = userUpdated.cart;
    }

    if (cart) {
      total = await cartService.calculateTotals(cart);
      cartProducts = await cartService.getCart(cart);
    }
    allProducts = await homeService.getHome();
  } catch (error) {
    console.log(error);
  }
  res.render('index', {
    products: allProducts,
    cart: { cartProducts, total },
    errorLogin: req.flash('errorLogin'),
    errorRegister: req.flash('errorRegister'),
    registerSuccess: req.flash('registerSuccess'),
    user: req.user ? req.user : null,
  });
};
module.exports = {
  getHome,
};
