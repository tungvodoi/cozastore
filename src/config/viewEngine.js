const express = require('express');
const path = require('path');
let configViewEngine = (app) => {
  app.use(express.static(path.join(__dirname + '/../public')));
  app.set('view engine', 'pug');
  app.set('views', './src/views');
};

module.exports = configViewEngine;
