const express = require('express');
const app = express();
const product= require('../modals/product.modal');

const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const page= req.query.page;  
        const pagesize= req.query.pagesize || 10; // 30 

        // if page is 1 then data will be from 1 to 30.
        // if page is 2 then data will be from 31 to 60.

        const skip= (page - 1) * pagesize;  
        // if page is 1 no skip of data happens.
        // if page is 2 then data will be skipped from 1 to 30.

         const products= await product.find()
          .skip(skip)
          .limit(pagesize)
          .lean().exec();


          const totalpages= Math.ceil(await product.find().countDocuments()/ pagesize);

         
         return res.status(200).send({products: products, totalpages: totalpages});
    } 
    catch (error) {
        
        return res.status(500).send({message: error.message});
    }
});

module.exports = router;
