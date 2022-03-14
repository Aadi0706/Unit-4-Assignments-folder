// importing the function from divide, multiply, add, subtract. 
let x=10; 
let y=2;
const add_res=require('./add');
const subtract_res=require('./subtract');
const product_res=require('./multiply');
const divide = require('./divide');

//printing the results of the above functions.
console.log(add_res(x,y));
console.log(subtract_res(x,y));
console.log(product_res(x,y));
console.log(divide(x,y));
