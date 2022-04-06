const express = require('express');
// const router = require('./controller/product.controller');
const productController = require('./controller/product.controller');

const app = express();

module.exports = app;

app.use("/products", productController);