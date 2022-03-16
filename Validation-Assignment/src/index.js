const express= require('express');
const app= express();
const userController= require('./controllers/user_controller');



app.use(express.json());

app.use("/users",userController); // http://localhost:5000/users will go to usersController

module.exports = app;
