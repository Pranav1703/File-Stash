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


app.use("/login",loginRouter)
app.use("/signup",signupRouter)
app.use("/upload",uploadRouter)
app.use("/getFiles",getFilesRouter)


