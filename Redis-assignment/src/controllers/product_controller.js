
const express= require('express');

const client = require('../configs/redis');

const Product = require('../modals/product.modal');

const router= express.Router();

router.post("", async (req, res) => {

    try {
        const product = await Product.create(req.body);

        const products = await Product.find().lean().exec();

        client.set("products",JSON.stringify(products));
        
        return res.status(201).send({product: product});
    } 
    catch (error) {
        console.error({error: error.message});
    }
});


router.get("/", async (req, res) => {
    
    try {
        client.get("products", async (err, fetchedproducts)=>{

            if(fetchedproducts){
                const products = JSON.parse(fetchedproducts);

                return res.status(200).send({products: products, redis:true});
             }
            else{

                try {
                    const products = await Product.find().lean().exec();

                    client.set("products", JSON.stringify(products));

                    return res.status(200).send({products: products, redis:false});
                 } 
                  catch (error) {
                  return res.status(500).send({error: error.message});   
                  }
            } 
          
        });   /// How this is closing here.
    } 
    catch (err) {   // mongoDb connection error message will come.
      return res.status(500).send({ message: err.message });
    }
  }); //it should have been closed here and


   router.get("/:id", async function (req, res){

    try {
         client.get(`products.${req.params.id}`, async function (err,fetchedproduct){
            if(fetchedproduct){

                const product = JSON.parse(fetchedproduct);

                return res.status(200).send({product: product, redis:true});

            }
            else{

                try {
                    const product = await Product.findById(req.params.id).lean().exec();

                    client.set(`products.${req.params.id}`, JSON.stringify(product));

                    return res.status(200).send({product: product, redis:false});

                } catch (err) {
                    
                    return res.status(500).send({err: err.message})
                }
            }
        });
        
    } catch (err) {
        return res.status(500).send({err: err.message});
    }
   });    
   
 router.patch(":/id", async function (req, res){

    try {
       const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new: true}).lean().exec();
       
       const products= await Product.find().lean().exec();

       client.set(`products.${req.params.id}`, JSON.stringify(product));
       client.set("products", JSON.stringify(products));

       return res.status(200).send({product: product});
    } 
    catch (error) {
        return res.status(500).send({error: error.message});
    }
 });

 router.delete(":/id", async function(req, res) {
     try {
         const product = await Product.findByIdAndDelete(req.params.id).lean().exec();

         const products= await Product.find().lean().exec;

         client.del(`products.${req.params.id}`);
         client.set("products",JSON.stringify(products));

         return res.status(200).send({product: product});

     }
      catch (error) {
        return res.status(500).send({error: errormessage}); 

     }
 });

        
   





module.exports=router;