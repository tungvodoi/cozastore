const express = require('express');
const productRouter = express.Router();
productRouter.get('/', (req, res) => {
  res.send('dmm');
});
module.exports = productRouter;
