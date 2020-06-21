let { cartService, productService } = require('../services/index');
let addToCart = async (req, res) => {
  let productId = req.body.productId;
  let quantity = parseInt(req.body.quantity);
  try {
    // If not exits session cart
    if (!req.session.cart) {
      req.session.cart = [];
      req.session.cart.push({ productId, quantity });
    } else if (!cartService.inCart(req.session.cart, productId, quantity)) {
      req.session.cart.push({ productId, quantity });
    }

    let product = await productService.findProductById(productId);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(501);
  }
};
let removeFromCart = async (req, res) => {
  let productId = req.body.productId;

  try {
   
    if (cartService.inCart(req.session.cart, productId)) {
      req.session.cart = req.session.cart.filter(
        (product) => product.productId != productId
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
