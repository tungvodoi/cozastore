const mongoose = require('mongoose');
const OrderSchena = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      color: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: {},
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Delivering', 'Finished'],
    default: 'Pending',
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: null,
  },
  deleteAt: {
    type: Number,
    default: null,
  },
});
OrderSchena.statics = {
  createNew(order) {
    return this.create(order);
  },
  getOrdersLimit(limit) {
    return this.find({}).limit(limit).sort({ createdAt: -1 });
  },
  deliveringOrder(orderId) {
    return this.updateOne({ _id: orderId }, { $set: { status: 'Delivering' } });
  },
  finishOrder(orderId) {
    return this.updateOne({ _id: orderId }, { $set: { status: 'Finished' } });
  },
  deleteOrder(orderId) {
    return this.deleteOne({
      _id: orderId,
    }).exec();
  },
};
module.exports = mongoose.model('order', OrderSchena);
