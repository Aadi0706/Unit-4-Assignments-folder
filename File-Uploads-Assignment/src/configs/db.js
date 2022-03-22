const mongoose = require('mongoose');

module.exports = ()=>{
    return mongoose.connect("mongodb://localhost:27017/file-upload");
}

// mongodb+srv://Aditya07:Aditya07@freeclusterdatabase.so6y5.mongodb.net/fileUpload-database?retryWrites=true&w=majority
