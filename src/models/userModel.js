const mongoose = require('mongoose');
let userModel = new mongoose.Schema({
  username: String,
  phone: {
    type: String,
    default: null,
  },
  address: [
    {
      country: String,
      state: String,
      postcode: Number,
    },
  ],
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
module.exports = mongoose.model('user', userModel);
