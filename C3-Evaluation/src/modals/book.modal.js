const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    likes:{type:Integer, defaultValue:0},
    coverImage:{type:String, required:true,only:1},
    content:{type:String, required:true},
    author_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    publication_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"publication",
        required:true
    }


},
{
    timestamps:true,
    versionKey:false,
});

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;