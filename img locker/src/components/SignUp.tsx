import { FormEvent, useState } from "react"
import { Link } from "react-router-dom";
import "../styles/login.css"
import axios from "axios"
 import { useNavigate } from "react-router-dom";


const SignUp = () => {
    

    const [name,setName] = useState<string>("");
    const [pass,setPass] = useState<string>("")
    const [signupStatus,setSignupStatus] = useState<string>("")
    
    const navigate = useNavigate()
    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(name === "" || pass=== ""){
            setSignupStatus("empty field")
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:3000/signup",{
                username:name,
                password:pass,
            })
            if(response.data === "exists"){

                setSignupStatus("user exists")

            }else if(response.data==="created"){
                
                navigate("/login")
            }
            
        } catch (error) {
            console.log(error)
        }

  
        setName("")
        setPass("")
    }


    return (
    <div className="block">
    <h1>SignUp</h1>
    <div className="container">

        <form action="POST" onSubmit={submitHandler}>
            <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)} placeholder="UserName"/>
            <input type="text" name="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
            <button className="submitBtn" type="submit" >register </button>
        </form>
        {signupStatus==="user exists" && <div className="errMsg">Username already exists</div>}
        {signupStatus==="empty field" && <div className="errMsg">Enter username and password</div>}

        <h5 id="existing">Already a user?</h5>
        <Link to="/login" className="redirect">Login</Link>
        
    </div>
    
    </div>
  )
}

export default SignUp
