const path= require('path');
const multer=require('multer');

const req= require('express/lib/request');

const storages= multer.diskStorage({
    // file destination function.
    destination: function(req, file, callback) {
        callback(null,path.join(__dirname,"../myuploads"));
    },
    // filenaming function
      filename: function (req, file, callback) {
        const uniquePrefix = Date.now();
        callback(null, uniquePrefix + "-" + file.originalname);
      },
});


// file type defining function.
const fileFilter=(req,res,callback)=>{

    if(file.mimetype==="image/jpeg"  || file.mimetype==="image/png"){
        // To accept the file pass `true`, like so:
        callback(null,true);
    }
    else{
        // To reject the file pass `false`, like so:
        callback(new Error("Incorrect mime type"),false);
    }
};

// options is an object to be passed in the multer middileware
const options={
    storages,
    fileFilter,
     limits: {
         filesize: 1024*1024*5,
     },
};

const upload = multer(options);

module.exports = upload;