import './styles/App.css'
import Header from './components/Header'
// import { useState } from 'react'
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"


function App() {
  // const [user,setUser] = useState<string>("")
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/signup" element = {<SignUp/>}/>
          <Route path="/" element = {<Header username = {"orjbg rjbg "}/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
