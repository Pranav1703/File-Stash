import { FormEvent,useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css"
import axios from "axios"

 import { useNavigate } from "react-router-dom";

const Login = () => {
    const [name,setName] = useState<string>("");
    const [pass,setPass] =  useState<string>("")
    const [loginStatus,setLoginStatus] = useState<string>("false")

    const navigate = useNavigate()

    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // await axios.post("http://localhost:3000/login",{
        //     user:username,
        //     password:pass
        // })
        // .then((response):void=>{
        //     console.log(response)
        // })
        // .catch((err:Error):void=>{
        //     console.log("err: ",err)
        // })

        try {
            const response = await axios.post("http://localhost:3000/login",{
                username:name,
                password:pass,
            })
            console.log(response)
            if(response.data==="exists"){
                
                navigate("/")
            }else if(response.data==="pass incorrect"){
                
                setLoginStatus("pass incorrect")

            }else if(response.data==="doesnt exist"){
                setLoginStatus("error")
            }
            
        } catch (error) {
            console.log(error)
        }

        
        setName("")
        setPass("")
    }

    return (
    <div className="main">
        <h1>LogIn</h1>
        <div className="container">

        <form action="POST" onSubmit={submitHandler}>
            <input type="text" name="username" value={name} 
            onChange={ (e) => 
            setName(e.target.value)
            } 
            placeholder="UserName"/>
            
            <input type="text" name="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
            <button className="submitBtn" type="submit">submit</button>
        </form>
        {loginStatus==="error" && <div className="errMsg">Username doesnt exits. Signup</div>}
        {loginStatus==="pass incorrect" && <div className="errMsg">incorrect password. Try again</div>}
        <h5 id="new">New User?</h5>

        <Link to="/signup" className="redirect">SignUp</Link>

    </div>
    </div>
  )
}

export default Login