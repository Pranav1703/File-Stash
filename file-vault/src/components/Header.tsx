import "../styles/header.css"
import { useNavigate } from "react-router-dom"
import {current_user} from "./Login"


const Header = () => {
  const navigate = useNavigate()
  const logOut = ()=>{
    navigate("/login")
    
  }

  
  return (
    <div className = "header">
      <h2>File valut</h2>
      <div className="user">
        <h4>Current User: {current_user}</h4>
        <button className="logoutBtn" type="button" onClick={logOut}>log out</button>
      </div>
    </div>
  )
}

export default Header