const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  productName: String,
  images: [String],
  sizes: [String],
  color: [String],
  price: Number,
  quantity: Number,
  description: String,
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  materials: String,
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null },
});

productSchema.statics = {
  createNew(item){
    return this.create(item);
  }
};
// let a = mongoose.model('product', productSchema);
// a.insertOne
module.exports = mongoose.model('product', productSchema);
