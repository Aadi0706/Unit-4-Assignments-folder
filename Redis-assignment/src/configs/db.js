const mongoose = require('mongoose');

const connect = ()=>{

    return mongoose.connect("mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-fileuploads?retryWrites=true&w=majority");
}

module.exports = connect;