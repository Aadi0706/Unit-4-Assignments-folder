// const {response} = require ('express');
const express= require('express');
const app = express();

app.get("/books",allBooks,(req,res) => {
   
  return res.send("I am on all books")
});

function allBooks(req,res,next){
    console.log("Fecthing all books");
    next();

}
app.get("/books/:name",singleBook,(req,res) => {
  return res.send({bookName:req.name})
});

function singleBook(req,res,next){
    console.log(req.params.name);
    req.name=req.params.name;
    next();
}
app.listen(4000,()=>{
    console.log("I am listening on 4000");
})