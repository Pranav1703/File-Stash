import express from "express"
import cors from "cors"
import 'dotenv/config'
import mongoose from "mongoose"
import loginRouter from "../routes/login.js"
import signupRouter from "../routes/signup.js"
import uploadRouter from "../routes/upload.js"
import getFilesRouter from "../routes/getFiles.js"

const port = 3000;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('storage'))

mongoose.Promise = Promise
const url = process.env.mongo_url as string
mongoose.connect(url)
mongoose.connection.on('error',(err:Error)=> console.log(err))

app.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
});


app.get("/",(req,res)=>{
    res.send("server working")
})


// app.post("/signup",async(req,res)=>{
//     // const {user,pass} = req.body
//     console.log(req.body)
//     try {
//         const check = await User.findOne({username: req.body.username})
//         console.log("check===",check)
//         if(check){

//             res.json("exists")

//         }else{
//             const newUser = await User.create({
//                 username: req.body.username,
//                 password: req.body.password,
//             })
//             res.json("created");
//         }
        
//     } catch (error) {
//         console.log("DB error--------------------------------------------------------------------------------------",error)
//         res.json("error from server")
//     }

    
// })

// app.post("/login", async(req, res)=>{
//     const {username,password} = req.body
//     console.log(username, "---", password);

//     try {
//         const check = await User.findOne({username: req.body.username})
//         console.log("check===",check)
//         if(check){

//             if(check.password === req.body.password){
//                 res.json("exists")
//             }
//             else{
//                 res.json("pass incorrect")
//             }

//         }else if(check===null){
            
//             res.json("doesnt exist");
//         }
        
//     } catch (error) {
//         console.log("DB error--------------------------------------------------------------------------------------",error)
//         res.json("error from server")
//     }


// });

app.use("/login",loginRouter)
app.use("/signup",signupRouter)
app.use("/upload",uploadRouter)
app.use("/getFiles",getFilesRouter)
// app.post("/upload",upload.single("uploadedFile"),async(req,res)=>{
//     res.json({recieved:true})
//     console.log("request body------------------\n",req.file);
//     console.log("username ---> ",req.body.user)
// })

