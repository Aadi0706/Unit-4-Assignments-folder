const express= require('express');
const mongoose= require('mongoose');
const app= express();

// connecting our local mongo database to localhost.
app.use(express.json());

const connect = ()=>{

    return mongoose.connect("mongodb://127.0.0.1:27017/C2Evaluation");
}

app.listen(4000, async()=>{
     try {
         await connect();

     } 
     catch (error) 
     {
         console.log(error)
     }
     console.log("listening on port 4000");
});


// ---- Users Schema ----- //
// Step 1:- Create the schema.
const userSchema = new mongoose.Schema(
    {
        firstName:{type:"string", required:true},
        middleName:{type:"string", required:true},
        lastName:{type:"string", required:true},
        age:{type:"number", required:true},
        email:{type:"string", required:true},
        address:{type:"string", required:true},
        gender:{type:"string", required:true, default:"female"},
        type:{type:"string", required:true, default:"customer"}
    },
    {
        timestamps:true,
        versionKey:false
    }
);

// Step 2: Create the model
const User= mongoose.model("user",userSchema);

// --- branch detail ---- //
const branchSchema = new mongoose.Schema(
    {
        name:{type:"string", required:true},
        address:{type:"string", required:true},
        IFSC:{type:"string", required:true},
        MICR:{type:"number", required:true}

    },
    {
      versionKey:false,
      timestamps:true
    }
    );
    const Branch= mongoose.model("branch",branchSchema);

    // ---- Master Account ---- //
    const masterSchema = new mongoose.Schema(
        {
            balance:{type:"number", required:true},
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user", 
                required:true
            },
            branchId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"branch", required:true
            },
        },
        {
            versionKey:false,
            timestamps:true
        }

    );
    const Master= mongoose.model("master",masterSchema);

    // ---- Savings Account --------//
    const savingsSchema= new mongoose.Schema(
        {
            account_number:{type:"number",required:true, unique:true},
            balance:{type:"number", required:true},
            interestRate:{type:"number", required:true},
            user:{type:"string", required:true, default:"employee" },
            masterId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"master",
                required:true
            }

        },
        {
            versionKey:false,
            timestamps:true
        }
    );
    const Savings= mongoose.model("savings",savingsSchema);

    // ---- Fixed Account ----//
    const fixedAccountSchema= new mongoose.Schema(
        {
            account_number:{type:"number",required:true, unique:true},
            balance:{type:"number", required:true},   
            interestRate:{type:"number", required:true},
            startDate:{type:"date", required:true},
            maturityDate:{type:"date", required:true},
            masterId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"master",
                required:true
            }
        },
        {
            versionKey:false,
            timestamps:true
        }
    );
    const FixedAccount= mongoose.model("fixedAccount",fixedAccountSchema);


    ///--------- CRUD operation ----------------//

    // for getting all users///
    app.get("/users", async (req, res) => {
        try {
            const users= await User.find().lean().exec()

            return res.status(200).send({users: users});
            
        } catch (error) {
            return res.status(500).send({error: error});
        }
       
    });

    app.post("/users", async (req, res) => {
        try {
            const users= await User.create(req.body);
            
            return res.status(201).send({users: users});
        } 
        catch (error) 
        {
            return res.status(500).send({error: error});
        }
    });

    // 1. getting all details of master account.

    app.get("/master", async (req,res) =>{
        try {
            const master= await Master.find().populate("userId").lean().exec()

            return res.status(200).send({master:master});
        } catch (error) {
            return res.status(500).send({error: error});
        }
    });

    // 2. post api to create savings account ///

    app.post("/savings", async (req, res) =>{
        try {
            const savings= await Savings.create(req.body);

            return res.status(200).send({savings: savings});
        } catch (error) {
            return res.status(500).send({error: error});
        }
    })