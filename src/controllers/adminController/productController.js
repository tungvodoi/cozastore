const multer = require('multer');
const uuid = require('uuid');
const fs = require('fs');

const app = require('./../../config/app');
const { productService } = require('../../services/index');
const { transErrors } = require('../../../lang/vi');
const { validationResult } = require('express-validator');

let getProducts = async (req, res) => {
  let products = await productService.getProducts();
  res.render('admin/product', {
    products: products,
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
};

let uploadImages = (req, res, next) => {
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
  }).array('images');
  uploadProductImage(req, res, function (err) {
    req.body.images = req.files;
    if (err) {
      console.log(err);
      if (err === 'LIMIT_FILE_SIZE') {
        errorsArr.push(transErrors.image_size);
      }
      req.flash('errors', errors);
      res.redirect('product');
    }
    next();
  });
};
let addProduct = async (req, res) => {
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash('errors', errorsArr);
    return res.redirect('product');
  }
  try {
    let newProduct = req.body;
    newProduct.images = [];
    req.files.forEach((file) => {
      newProduct.images.push(file.filename);
    });
    if (typeof newProduct.colors == 'string') {
      newProduct.colors = [newProduct.colors];
      newProduct.sizes = [newProduct.sizes];
      newProduct.quantity = [newProduct.quantity];
    }
    //Add product
    let addProductStatus = await productService.addProduct(newProduct);
    req.flash('success', addProductStatus);
    res.redirect('product');
  } catch (error) {
    // Remove file when have error
    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    console.log(error);
    errorsArr.push(transErrors.add_product);
    // res.render('admin/products', { errors: errorsArr });
    req.flash('errors', errorsArr);
    res.redirect('product');
  }
};
let updateProduct = async (req, res) => {
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash('errors', errorsArr);
    return res.redirect('product');
  }
  try {
    let newProduct = req.body;
    newProduct.images = [];
    req.files.forEach((file) => {
      newProduct.images.push(file.filename);
    });
    if (typeof newProduct.colors == 'string') {
      newProduct.colors = [newProduct.colors];
      newProduct.sizes = [newProduct.sizes];
      newProduct.quantity = [newProduct.quantity];
    }
    //Update product
    let addProductStatus = await productService.updateProduct(newProduct);
    req.flash('success', addProductStatus);
    res.redirect(`product/edit/${newProduct.id}`);
  } catch (error) {
    // Remove file when have error
    console.log(error);
    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    errorsArr.push(transErrors.add_product);
    // res.render('admin/products', { errors: errorsArr });
    req.flash('errors', errorsArr);
    res.redirect(`product/edit/${newProduct.id}`);
  }
};
let getEditProduct = async (req, res) => {
  let product = await productService.getProductDetail(req.params.id);
  res.render('admin/edit-product', {
    product,
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
};
let deleteProductImage = async (req, res) => {
  try {
    let productId = req.body.productId;
    let linkImage = req.body.linkImage;
    let statusDelete = productService.deleteProductImage(productId, linkImage);
    res.status(200).send(statusDelete);
  } catch (error) {
    console.log(error);
    res.status(501).send(error);
  }
};
let deleteProduct = async (req, res) => {
  try {
    let productId = req.body.productId;
    let statusDelete = productService.deleteProduct(productId);
    res.status(200).send(statusDelete);
  } catch (error) {
    console.log(error);
    res.status(501).send(error);
  }
};
module.exports = {
  getProducts,
  addProduct,
  uploadImages,
  getEditProduct,
  updateProduct,
  deleteProductImage,
  deleteProduct,
};
