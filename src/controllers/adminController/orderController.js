const { orderService } = require('../../services/index');
let getOrder = async (req, res) => {
  let orders;
  let errorsArr = [];
  try {
    orders = await orderService.getOrders();
  } catch (error) {
    errorsArr.push(error);
    console.log(error);
  }
  res.render('admin/order', {
    orders: orders,
    errors: errorsArr,
    success: [],
  });
};

let acceptOrder = async (req, res) => {
  let errorsArr = [];
  try {
    let statusUpdate = await orderService.deliveringOrder(req.body.orderId);
    res.status(200).send(statusUpdate);
  } catch (error) {
    errorsArr.push(error);
    console.log(error);
  }
};
let finishOrder = async (req, res) => {
  let errorsArr = [];
  try {
    let statusUpdate = await orderService.finishOrder(req.body.orderId);
    res.status(200).send(statusUpdate);
  } catch (error) {
    errorsArr.push(error);
    console.log(error);
  }
};
let deleteOrder = async (req, res) => {
  let errorsArr = [];
  try {
    let statusUpdate = await orderService.deleteOrder(req.body.orderId);
    res.status(200).send(statusUpdate);
  } catch (error) {
    errorsArr.push(error);
    console.log(error);
  }
};
module.exports = { getOrder, acceptOrder, finishOrder, deleteOrder };
