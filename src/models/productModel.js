const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  product_attr: [
    {
      color: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  images: [String],
  weight: { type: Number, default: null },
  dimensions: {
    length: { type: Number, default: null },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
  },
  status: { type: Boolean, default: false },
  price: { type: String, required: true },
  description: String,
  materials: String,
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null },
});

productSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findAllProducts() {
    return this.find({}).sort({ createdAt: -1 });
  },
  findProductById(productId) {
    return this.findById(productId).exec();
  },
  findProductLimit(limit) {
    return this.find({}).limit(limit);
  },
  updateProduct(product) {
    return this.updateOne({ _id: product.id }, { $set: product });
  },
  updateProductImages(product) {
    return this.updateOne(
      {
        _id: product.id,
      },
      { $push: { images: { $each: product.images } } }
    ).exec();
  },
  deleteImage(productId, linkImage) {
    return this.updateOne(
      {
        _id: productId,
      },
      { $pull: { images: linkImage } }
    ).exec();
  },
  deleteProduct(productId) {
    return this.deleteOne({
      _id: productId,
    }).exec();
  },
  reduceQuantity(productId, subProductId, quantity) {
    return this.updateOne(
      {
        _id: productId,
        'product_attr._id': subProductId,
      },
      { $inc: { 'product_attr.$.quantity': -quantity } }
    ).exec();
  },
  getSizeByColor(productId, color) {
    return this.aggregate([
      // Filter possible documents
      { $match: { _id: ObjectId(productId) } },

      // Unwind the array to denormalize
      { $unwind: '$product_attr' },

      // Match specific array elements
      { $match: { 'product_attr.color': color } },

      // Group back to array form
      {
        $group: {
          _id: '$_id',
          sizes: { $push: '$product_attr.size' },
        },
      },
    ]);
  },
  getColorBySize(productId, size) {
    return this.aggregate([
      // Filter possible documents
      { $match: { _id: ObjectId(productId) } },

      // Unwind the array to denormalize
      { $unwind: '$product_attr' },

      // Match specific array elements
      { $match: { 'product_attr.size': size } },

      // Group back to array form
      {
        $group: {
          _id: '$_id',
          colors: { $push: '$product_attr.color' },
        },
      },
    ]);
  },
};
// let a = mongoose.model('product', productSchema);
// a.findById
module.exports = mongoose.model('product', productSchema);
