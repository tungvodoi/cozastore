let { homeService, cartService } = require('../services/index');
let getHome = async (req, res) => {
  let allProducts;
  let cartProducts = [];
  let total;
  try {
    // Cart
    let cart = req.session.cart;

    if (cart) {
      total = await cartService.calculateTotals(cart);
      cartProducts = await cartService.getCart(cart);
    }

    allProducts = await homeService.getHome();
  } catch (error) {
    console.log(error);
  }

  res.render('index', { products: allProducts, cart: { cartProducts, total } });
};
module.exports = {
  getHome,
};
