const mongoose = require('mongoose');


module.exports = function(){
    return mongoose.connect("mongodb+srv://Aditya07:Aditya07@freeclusterdatabase.so6y5.mongodb.net/FreeClusterDatabase?retryWrites=true&w=majority")
}