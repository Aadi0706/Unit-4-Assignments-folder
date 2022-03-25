
const express= require('express');

const app= express();
const productController = require('./controllers/product_controller');

app.use(express.json());

app.use("/products",productController);

module.exports = app;