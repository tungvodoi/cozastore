let { productService, cartService } = require('../services/index');

let getProductDetail = async (req, res) => {
  try {
    let productDetail = await productService.getProductDetail(req.params.id);
    // Cart
    let cart = req.session.cart;
    let cartProducts = [];
    let total;
    if (cart) {
      total = await cartService.calculateTotals(cart);
      cartProducts = await cartService.getCart(cart);
    }
    
    res.render('product-detail', {
      productDetail,
      cart: { cartProducts, total },
    });
  } catch (error) {
    console.log(error);
    res.render('product-detail');
  }
};
module.exports = { getProductDetail };
