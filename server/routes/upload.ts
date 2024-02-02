import express from "express"
import {File} from "../models/file.js"
import {upload} from "../middleware/multer.js"

const router = express.Router();

router.post("/",upload.single("uploadedFile"),async(req,res)=>{

    console.log("request body------------------\n",req.file);
    try {
       const doc = await File.create({
            file: req.file!.filename,
            user: req.body.user,
       })
       console.log(String(doc.createdAt));
       res.json({status: "document created in db"});
    } catch (error) {
        console.log("error while saving file-----------",error)
    }

})

export default router
