const express = require("express");

const User = require("../modals/user.modals");
const Gallery=require("../modals/gallery.model");


const upload = require("../middleware/upload");

const router= express.Router();

router.get("", async (req, res) => {
    try {
        const user = await User.find().lean.exec();
        
        return res.status(200).send({user: user});
    } 
    catch (error) {
        return res.status(500).send({error: error});
    }
});

// post method to create a single profile pic of user to be uploaded.
router.post("", upload.single("profile_pic"), async (req, res) => {
        
    try {
        const user = await User.create(
            {
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                profile_pic:req.file.path,
            }
        );
        return res.status(200).send({user: user});    
    } catch (error)
     {
        return res.status(500).send({message: err.message});
    }
});

// post method to upload moer than one photos.
// router.post("/multiple",upload.array("userpictures",5), async (req, res) =>{
//     try {
//        const filePaths= req.files.map((file)=>{
//            return file.path
//        });
//        const user = await User.create({
//            userpictures:req.body.userpictures,
//        })
//     } 
//     catch (error)
//      {
        
//     }
// })


module.exports = router;