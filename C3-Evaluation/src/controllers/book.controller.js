const express = require('express');
const Book=require('../modals/book.modal');

const router = express.Router();

// 2. Creating a route for books.

router.post("/", async (req, res) => {
    try {
         const book= await Book.Create(req.body).lean().exec();
         return res.status(201).send({book: book});    
    } 
    catch (error) {
        return res.status(500).send({error: error})
    }
});

module.exports = router