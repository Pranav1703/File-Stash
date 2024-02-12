import express from "express"
import {User} from "../models/user.js"

const router = express.Router()

router.post("/",async(req,res)=>{

        // const {user,pass} = req.body
        console.log(req.body)
        try {
            const check = await User.findOne({username: req.body.username})
            console.log("check===",check)
            if(check){
    
                res.json("exists")
    
            }else{
                await User.create({
                    username: req.body.username,
                    password: req.body.password,
                })
                res.json("created");
            }
            
        } catch (error) {
            console.log("DB error--------------------------------------------------------------------------------------",error)
            res.json("error from server")
        }
    

})

export default router