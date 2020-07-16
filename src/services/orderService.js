let ProductModel = require('../models/productModel');
let OrderModel = require('../models/orderModel');
let UserModel = require('../models/userModel');
let { transErrors } = require('../../lang/vi');
let createOrder = (userId, cart, shippingAddress) => {
  return new Promise(async (resolve, reject) => {
    if (cart.length > 0) {
      const session = await ProductModel.startSession();
      session.startTransaction();
      let productAttrIndex = 0;
      let total = 0;
      try {
        await Promise.all(
          // reduce quantity
          cart.map(async (productInCart) => {
            let product = await ProductModel.findProductById(
              productInCart.productId
            );
            for (let i = 0; i < product.product_attr.length; i++) {
              if (
                product.product_attr[i].color === productInCart.color &&
                product.product_attr[i].size === productInCart.size
              ) {
                productAttrIndex = product.product_attr[i]._id;
                await ProductModel.reduceQuantity(
                  product._id,
                  productAttrIndex,
                  productInCart.quantity
                );
              }
            }
            total += parseInt(product.price * productInCart.quantity);
            return product;
          })
        );
        let order = {
          userId: userId,
          products: cart,
          shippingAddress: shippingAddress,
          total,
        };
        await OrderModel.createNew(order);
        UserModel.deleteShoppingCart(userId);
        resolve('Create order success');
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        reject(false);
      }
    }
  });
};
let getOrders = async () => {
  let orders = await OrderModel.getOrdersLimit(10);
  await Promise.all(
    orders.map(async (order) => {
      let user = await UserModel.findUserById(order.userId);
      order.user = user;
      return order;
    })
  );
  return orders;
};
let deliveringOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    let updateStatus = await OrderModel.deliveringOrder(orderId);
    if (updateStatus.nModified > 0) {
      resolve('admin/order');
    }
    reject(false);
  });
};
let finishOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    let updateStatus = await OrderModel.finishOrder(orderId);
    if (updateStatus.nModified > 0) {
      resolve('admin/order');
    }
    reject(false);
  });
};
let deleteOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    let statusDelete = await OrderModel.deleteOrder(orderId);
    if (statusDelete.deletedCount == 1) {
      resolve('admin/order');
    } else {
      reject(false);
    }
  });
};
module.exports = {
  createOrder,
  getOrders,
  deliveringOrder,
  finishOrder,
  deleteOrder,
};
