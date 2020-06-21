const mongoose = require('mongoose');
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
  findProductById(productId) {
    return this.findById(productId).exec();
  },
  findProductLimit(limit) {
    return this.find({}).limit(limit);
  },
};
// let a = mongoose.model('product', productSchema);
// a.findById
module.exports = mongoose.model('product', productSchema);
