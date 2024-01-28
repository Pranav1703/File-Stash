import express from "express"
import {User} from "../models/user.js"

const router = express.Router()

router.post("/",async(req,res)=>{
    const {username,password} = req.body
    console.log(username, ":::", password);

    try {
        const check = await User.findOne({username: req.body.username})
        console.log("check ===",check)
        if(check){

            if(check.password === req.body.password){
                res.json({
                    exists: true ,
                    username: check.username, 
                })
            }
            else{
                res.json("pass incorrect")
            }

        }else if(check===null){
            
            res.json("doesnt exist");
        }
        
    } catch (error) {
        console.log("DB error--------------------------------------------------------------------------------------",error)
        res.json("error from server")
    }

})

export default router