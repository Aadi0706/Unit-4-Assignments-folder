const express= require('express');
const { body, validationResult } = require('express-validator');

const User = require('../modals/user_models');

const router= express.Router();


router.post("/",
 body("firstName").not().isEmpty()
 .withMessage("First name can't be empty")
 .isLength({min:4})
 .withMessage("First name must be at least 4 characters"),
 body("lastName").not().isEmpty()
 .withMessage("Last name can't be empty"),
 body("email").not().isEmpty().custom(async (value) =>{
    const user= await User.findOne({email:value});

    if(user){
        throw new Error("Email is allready registered.")
    }
    return true;
 }),
 body("pincode").not().isEmpty.isNumeric().custom(async(value) => {
     if(val && val.length>6){
         throw new Error("The pincode can't be more than 6 digits.")
     }
     return true;

 }),
 body("age")
 .not()
 .isEmpty().withMessage("Age can't be empty'")
 .isNumeric().withMessage("Age should be a number between 0 and 100")
 .custom(async(val)=>{
      if(val< 0 || val>100) {
          throw new Error("Icorrect age provided.")
      } 
      return true;
 }),
 body("gender")
 .not().isEmpty().withMessage("Gender can't be empty'")
 .custom(async(val)=>{
     if(val!=="Male"||val!=="Female"||val!=="Others") {
         throw new Error("Icorrect gender provided.")
     }
     return true;
 }),
 async(req, res)=>{
     try {
         const errors= validationResult(req);
         console.log({errors});
         if(!error.isEmpty){
             res.status(400).send({errors:errors.array});
         }


         const user= await User.create(req.body);
         return res.status(201).send({user:user});


     } catch (error) {
         return res.status(500).send({error:error.message});
     }
 }
);

module.exports = router;