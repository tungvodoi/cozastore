let { homeService } = require('../services/index');
let getHome = async (req, res) => {
  let allProducts;
  try {
    allProducts = await homeService.getHome();
    console.log(allProducts);
  } catch (error) {
    console.log(error);
  }

  res.render('index', { products: allProducts });
};
module.exports = {
  getHome,
};
