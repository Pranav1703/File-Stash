import express from "express"
import {File} from "../models/file.js"

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const allFiles = await File.find();
        console.log("data from DB-----------------------------------------\n",allFiles)
        
        res.json({
            dataArray: allFiles,
            searchStatus: true,
        })
    } catch (error) {
        console.log("error while finding all the files -----------",error)
        res.json({
            dataArray: null,
            searchStatus: "error",
        })
    }
})

export default router 