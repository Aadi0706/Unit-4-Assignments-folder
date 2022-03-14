const express= require('express');
const mongoose= require('mongoose');
const app= express();

// connecting the mongo db server with express

const connect= () =>{
    return mongoose.connect(" mongodb://localhost:27017/book_assignment");
};

  // Author Schema
  // Step 1 :- creating the schema
  const authorSchema= new mongoose.Schema(
      {
          first_name:{type:String, required:true},
          last_name:{type:String, required:false}
      },
      {
          versionKey:false,
          timestamps:true
      }
  );

  // Step 2:- creating the model
  const Author= mongoose.model("author",authorSchema);
  
  // Books Schema
  // Step 1 :- creating the schema

  const bookSchema= new mongoose.Schema(
      {
          name:{type:String, required:true},
          body:{type:String, required:true},
          section_id:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"section", 
              required:true},
          author_id:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"author",
              required:true
          }    
      },
     
      {
        versionKey:false,
        timestamps:true
     }
  );
  // Creating the book moodel
  const Book= mongoose.model("book",bookSchema);

  //Section Schema
  //Step1: creating the schema
  const sectionSchema=new mongoose.Schema(
      {
        name:{type:String, required:true}
      },
      {
        versionKey:false,
        timestamps:true
     }
  );
  //Step2:- creating the model
  const Section= mongoose.model("section",sectionSchema);

  //creating authors
  //Step 1: creating the author schema
//   const authorSchema=new mongoose.Schema(
//       {
//           userId:{type:String,required:true}
//       },
//       {
//           versionKey:false,
//           timestamps:true
//       }
//   );
//   // Step2: creating the model of author Schema
//   const Author=mongoose.model("author",authorSchema);
  
  //step1: Checkout schema
  const checkoutSchema= new mongoose.Schema(
      {
          userId:{type:String,required:true},
          bookId:{type:String,required:true},
          checkOutTime:{type:Date,required:true, default:null},
          checkInTime:{type:Date,required:true,default:null}
      }
  );
  //step2: Checkout
  const Checkout=mongoose.model('Checkout',checkoutSchema);
  

  // Step1: creating the Author_book Schema
  const author_bookSchema = new mongoose.Schema(
      {
          bookId: {type:String,required:true},
          authorId: {type:String,required:true}
      }
  );
// Step2: creating the model.
  const author_book=mongoose.model('Author_book',author_bookSchema);



//----------- Section Creation ----------------//
app.get("/section", async (req, res) => {
    try {
        const sections= await Section.find().lean().exec();

        return res.status(200).send({section: sections});
    } catch (error) 
    {
       return res.status(500).send({error: error});    
    }
});

app.patch("/section", async (req, res) => {
    try {
        const section= await Section.create(req.body);

        return res.status(201).send({section: sections});
    } catch (error) 
    {
       return res.status(500).send({error: error});    
    }
});

//-------------- book get and patch operations -----------//
app.get("/books", async (req, res) => {
    try {
        const books= await Section.find()
        .populate("section_id")
        .populate("author_id")
        .lean().exec();

        return res.status(200).send({books: books});
    } catch (error) 
    {
       return res.status(500).send({error: error});    
    }
});

app.post("/books", async (req, res) => {
    try {
        const books= await Book.create(req.body);

        return res.status(200).send({books: books});
    } 
    catch (error)
     {
       return res.status(500).send({error: error}); 
    }
})



  //-------- authors/users get and patch -----------//
  app.get("/users", async (req, res) => {
        try {
            const users= await Author.find().lean().exec();

            return users.status(200).res.send({users:users});
        } 
        catch (error)
         {
            return users.status(500).res.send({message: "Something went wrong .. try again later"});
        }
  });

  app.post("/users",async(req, res) =>{
      try {
          const user= await Author.create(req.body);

          return res.status(201).send({user: user});
      } catch (error) 
      {
          return res.status(500).send({error: error});
      }
  });



  // ---- getting all the books written by an author --------------------//
  app.get("/:author_id/books", async (req, res) => {
    try {
        const books= await Author.findById({author_id:req.params.author_id}).lean().exec();

        return books.status(200).res.send({books: books});
    } 
    catch (error)
     {
        return books.status(500).res.send({message: "Something went wrong .. try again later"});
    }
});

  
//------------------ finding books in a section ---------------//
app.get("/books/:section_id", async (req, res) => {
    try {
        const books= await Author.findById({section_id: req.params.section_id}).lean().exec();

        return books.status(200).res.send({books:books});
    } 
    catch (error)
     {
        return books.status(500).res.send({message: "Something went wrong .. try again later"});
    }
});

//----------- find books of 1 author inside a section Optional------------------------//
app.get("/books/:section_id/:author_id", async(req, res)=>{
    try {
        const books= await Book.findById({$and:[{section_id:req.params.section_id}, {author_id:req.params.author_id}]})
    } catch (error) {
        return users.status(500).res.send({message: "Something went wrong .. try again later"});
    }
})


// app.patch("/users/:id",async(req, res) =>{
//     try {
//         const user= await User.findByIdAndUpdate(
//             req.params.id,req.body
//             ,{new:true})
//             .lean().exec();

//         return res.status(201).send(user);
//     }
//     catch (error){
//         return res.status(500).send({error: error});
//     }
// });

// app.delete("users/:id",async(req, res) =>{
//     try {
//         const user= await User.find(req.params.id);

//         return res.status(200).send({user});
//     } catch (error) {
//         return res.status(500).send({error: error});
//     }
// });

// Books CRUD operations
app.get("/books",async(req, res) =>{
    try {
        const books= await Book.find().lean().exec();
        return res.status(200).send({books: books});
    } 
    catch (error) {
        return res.status(500).send({error: error})
    }
});

app.post('/books',async(req, res) =>{
    try {
        const book=await Book.create(req.body);

        return res.status(201).send({book: book});
    } catch (error) {
        return res.status(500).send({error:error});
    }
})

app.patch("/books/:id",async(req, res) =>{

    try {
        const book=await Book.findByIdAndUpdate(req.params.id,req.body);

        return res.status(201).send({book:book});
    } catch (error) {
        return res.status(500).send({error: error});
    }
});

app.delete("/books/:id",async(req, res) =>{
    try {
        const book=await Book.findByIdAndDelete(req.params.id);
        return res.status(200).send({book:book});
    } catch (error) {
        return res.status(500).send({error: error});
    }
})

// app.post("/books",async(req, res) =>{
//     try {
//         const book= await Book.create(req.body);

//         return res.status(200).send({book:book});
//     } catch (error) {

//         return res.status(500).send({error: error});
        
//     }
// });










app.listen(4000, async()=>{
     try {
         await connect();
     } 
     catch (error) {
         console.log(error);    
     }
})