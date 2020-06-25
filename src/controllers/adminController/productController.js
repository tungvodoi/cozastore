const multer = require('multer');
const uuid = require('uuid');
const fs = require('fs');

const app = require('./../../config/app');
const { productService } = require('../../services/admin/index');
const { transErrors } = require('../../../lang/vi');

let getProducts = (req, res) => {
  res.render('admin/product');
};
let getAddingProduct = (req, res) => {
  res.render('admin/add-product');
};

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, app.product_image_directory);
  },
  filename: function (req, file, cb) {
    if (app.product_image_type.indexOf(file.mimetype) === -1) {
      return cb(transErrors.image_type, null);
    }
    let productImageName = `${Date.now()}-${uuid.v4()}-${file.originalname}`;
    cb(null, productImageName);
  },
});

let uploadProductImage = multer({
  storage: storage,
  limits: { fileSize: app.product_image_limit_size },
}).array('images[]');

let addProduct = (req, res) => {
  let errorsArr = [];
  uploadProductImage(req, res, async function (err) {
    if (err) {
      console.log(err);
      if (err === 'LIMIT_FILE_SIZE') {
        errorsArr.push(transErrors.image_size);
      }
      res.render('admin/add-product', { errors: app.server_error });
    }

    try {
      let newProduct = req.body;
      
      newProduct.images = [];
      req.files.forEach((file) => {
        newProduct.images.push(file.filename);
      });
      // console.log(newProduct);
      //Add product
      let addProductStatus = await productService.addProduct(newProduct);

      res.render('admin/add-product', { success: addProductStatus });
    } catch (error) {
      // Remove file when have error
      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
      console.log(error);
      errorsArr.push(transErrors.add_product);
      res.render('admin/add-product', { errors: errorsArr });
    }
  });
};
module.exports = {
  getAddingProduct,
  getProducts,
  addProduct,
};
