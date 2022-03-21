const express = require('express');

// controllers
const Usercontroller = require('../controllers/users.controller');



const app = express();

app.use(express.json());

app.use("users",UserController);

module.exports = app;
