import express from "express"
import {File} from "../models/file.js"

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const allFiles = await File.find();
        console.log("data from DB-----------------------------------------\n",allFiles)
        res.json({
            dataArray: allFiles,
            status: "found all docs",
        })
    } catch (error) {
        console.log("error while finding all the files -----------",error)
        res.json({
            dataArray: null,
            status: "error",
        })
    }
})

export default router 