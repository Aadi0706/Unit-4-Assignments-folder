const express = require('express');

// controllers
const Usercontroller = require('../controllers/users.controller');
const Bookcontroller = require('../controllers/book.controller');


const app = express();

app.use(express.json());

app.use("users",Usercontroller);
app.use("book",Bookcontroller);

module.exports = app;
