const express = require('express');
const User=require('../modals/user.modal');

const { body, validationResult } = require('express-validator');

const router = express.Router();

// 1. Creating the post of the user to register.
router.post("/",
body("firstName").not().isEmpty().withMessage("First name can't be empty")
.isLength({min:3, max:30}).withMessage("First name can't be more than 30 characters"),
body("lastName").not().isEmpty().withMessage("Last name can't be empty")
.isLength({min:3, max:30}).withMessage("Last name can't be more than 30 characters"),
body("age").not().isEmpty().withMessage("Age can't be empty").Numeric()
.custom(async (val)=>{
    if(val<0 || val>150){
        throw new Error("Incorrect age provided.")
    }
    return true;
}),
body("email").not().isEmpty().withMessage("Email name can't be empty")
.custom(async(val)=>{

    const user= await User.findOne({email:val});
    
    if(user){
        throw new Error("Email is allready registered.")
    }
    return true;
}),
async(req, res)=>{
    try {
        const errors= validationResult(req);
        if(!error.isEmpty){
            res.status(400).send({errors:errors.array})
        }
        const user= await User.create(req.body);
        return res.status(201).send({user: user});
    } 
    catch (error) 
    {
        return res.status(500).send({error: error.message});
    }
}

);

module.exports =router;