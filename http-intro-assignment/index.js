
const express = require('express'); //importing in the express function from express module

const app = express();

 
app.get("",function(req,res){

    res.send("hello");
});

app.get("/books",function(req,res){
    
    res.send({Book1:'Seven habits of Highly Effective People',
            Book2:'Think and Grow Rich',
            Book3:'How to win friends and influence people',
            Book4:'The 5 seconds Rule'});
});

app.listen(5000, ()=>{
    console.log('listening on port 5000');
});


