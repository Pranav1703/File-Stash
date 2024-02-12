import express from "express"
import {File} from "../models/file.js"
import fs from "fs"

const router = express.Router();

router.get("/all",async(req,res)=>{
    try {
        const allFiles = await File.find();
        console.log("data from DB-----------------------------------------\n",allFiles);
        console.log(typeof(allFiles[0]._id))
        const filteredFilesArray = allFiles.map((element) =>{
            return {

                id: element._id.toString(),
                file: element.file,
                user: element.user,
                date: element.createdAt.toString().substring(4,15).split(" ").join("-"),
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

router.post("/:filename",async(req,res)=>{
    try {
        
        console.log(req.params)
        
        const count = await File.deleteOne({file: req.params.filename})
        console.log("file deleted ---", count)

        const path = `./storage/${req.params.filename}`

        fs.unlink(path,(err)=>{
            if(err){

                console.log("error when trying to delete the file",err)
                res.json("delete failed")

            }else{
                console.log("file deleted from storage.")
                res.json("delete success")
            }
        })

       

        

    } catch (error) {

        console.log("error when deleting a file ---",error);

    }
})


export default router 