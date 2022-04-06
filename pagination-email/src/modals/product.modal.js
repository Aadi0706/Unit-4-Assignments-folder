
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:String, required:true},
    image_url:{type:String, required:true}
},
{
    versionKey:false,
    timeStamps: true
});

const Product = mongoose.model('products',productSchema);

module.exports = Product;