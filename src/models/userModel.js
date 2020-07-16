const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let userModel = new mongoose.Schema({
  username: String,
  phone: {
    type: String,
    default: null,
  },
  shippingAddress: {
    type: Array,
    default: [
      {
        address:
          '25/31 Khu 10, Phường Thanh Bình, Thành phố Hải Dương, Hải Dương',
        country: 'Việt Nam',
        postcode: 170000,
        isActive: true,
      },
      {
        address: '18 Tam Trinh, Phường Minh Khai, Quận Hai Bà Trưng, Hà Nội',
        country: 'Việt Nam',
        postcode: 100000,
        isActive: false,
      },
    ],
  },
  avatar: {
    type: String,
    default: 'avatar-default.jpg',
  },
  role: {
    type: String,
    default: 'user',
  },
  local: {
    email: {
      type: String,
      trim: true,
    },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String,
  },
  cart: [
    {
      productId: { type: String, required: true },
      subProductId: { type: String, required: true },
      color: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
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
userModel.statics = {
  createNew(user) {
    return this.create(user);
  },
  findByToken(token) {
    return this.findOne({ 'local.verifyToken': token }).exec();
  },
  removeById(id) {
    return this.findOneAndRemove({ _id: id }).exec();
  },
  verify(token) {
    return this.findOneAndUpdate(
      { 'local.verifyToken': token },
      { 'local.isActive': true, 'local.verifyToken': null }
    ).exec();
  },
  findUserById(userId) {
    return this.findById(userId).exec();
  },
  findUserByName(username) {
    return this.findOne({ username: username });
  },
  findUserByEmail(email) {
    return this.findOne({ 'local.email': email });
  },
  addSessionToCart(userId, cart) {
    return this.updateOne({ _id: userId }, { $set: { cart: cart } }).exec();
  },
  addToCart(userId, product) {
    return this.updateOne({ _id: userId }, { $push: { cart: product } }).exec();
  },
  updateQuantityProduct(userId, productId, quantity) {
    return this.updateOne(
      {
        _id: userId,
        'cart._id': productId,
      },
      { $set: { 'cart.$.quantity': quantity } }
    ).exec();
  },
  deleteProductInCart(userId, subProductId) {
    return this.updateOne(
      {
        _id: userId,
        'cart.subProductId': subProductId,
      },
      { $pull: { cart: { subProductId: subProductId } } }
    ).exec();
  },
  deleteShoppingCart(userId) {
    return this.updateOne(
      {
        _id: userId,
      },
      { $set: { cart: [] } }
    ).exec();
  },
};
userModel.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password);
  },
};
module.exports = mongoose.model('user', userModel);
