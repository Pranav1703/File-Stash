import "../styles/header.css"
import { useNavigate } from "react-router-dom"



type props = {
  username: string
}

const Header = ({username}:props ) => {
  const navigate = useNavigate()
  const logOut = ()=>{
    navigate("/login")
    
  }
  
  return (
    <div className = "header">
      <h2>Bookmark Manager</h2>
      <div className="user">
        <h4>Current User: <span>{username}</span></h4>
        <button className="logoutBtn" type="button" onClick={logOut}>log out</button>
      </div>
    </div>
  )
}

export default Header