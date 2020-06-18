const { model } = require('../models/productModel');

let { productService } = require('../services/index');
let getProductDetail = async (req, res) => {
  try {
    let productDetail = await productService.getProductDetail(req.params.id);
    res.render('product-detail', { productDetail });
  } catch (error) {
    console.log(error);
    res.render('product-detail');
  }
};
module.exports = { getProductDetail };
