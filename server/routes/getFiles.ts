import express from "express"
import {File} from "../models/file.js"

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const allFiles = await File.find();
        console.log("data from DB-----------------------------------------\n",allFiles)
        const filteredFilesArray = allFiles.map((element) =>{
            return {
                id: parseInt(element._id.toString(),10),
                file: element.file,
                user: element.user,
                data: element.createdAt.toString().substring(4,15).split(" ").join("-"),
                time: element.createdAt.toString().substring(16,24),

            }
        })

        console.log("filtered array --------\n",filteredFilesArray)

        //required sub string is (4,24) includes data and time 

        //testing on values 
        // allFiles.forEach((element)=> console.log(typeof(element.createdAt),"value:::", (element.createdAt.toString().substring(16,24))  ))

        res.json({
            dataArray: filteredFilesArray,
            searchStatus: true,
        })
        // res.json(allFiles)
    } catch (error) {
        console.log("error while finding all the files -----------",error)
        res.json({
            dataArray: null,
            searchStatus: false,
        })
        // res.json("null")
    }
})

export default router 