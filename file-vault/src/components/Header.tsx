import "../styles/header.css"
import { useNavigate } from "react-router-dom"
 import {current_user} from "./Login"


const Header = () => {
  const navigate = useNavigate()
  const logOut = ()=>{
    navigate("/login")
    
  }
  console.log(current_user)
  return (
    <div className = "header">
      <h2>File Locker</h2>
      <div className="user">
        <h4>Current User: <span>{current_user}</span></h4>
        <button className="logoutBtn" type="button" onClick={logOut}>log out</button>
      </div>
    </div>
  )
}

export default Header