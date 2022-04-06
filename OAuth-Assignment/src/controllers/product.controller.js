
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const authorise = require("../middlewares/authorise");
const { populate } = require("../models/product.model");


const Product = require("../models/product.model")

router.post("", authenticate, async (req, res) => {

    req.body.user_id = req.user._id;
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.patch("/:id", authenticate, authorise(["admin","seller"]), async(req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

// getting all the products with seller info in them.
router.get("", authenticate, async (req, res) => {
    try{
        const products = await Product.find().populate(
            {
              path:"user_id",
              select:["name","role"]
            }
        ).lean().exec();
        return res.status(200).send(products)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
});

// delete products  by the authorised seller and admin.

router.delete("/:id", authenticate,authorise(["admin","seller"]), async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

module.exports = router;