import './styles/App.css'
import {BrowserRouter , Routes, Route} from "react-router-dom"
import {Login} from "./components/Login"
import SignUp from "./components/SignUp"
import Home from './components/Home'




function App() {
  
  return (
    <>
      <BrowserRouter>

          <Routes>
            <Route path="/login" element = {<Login />}/>
            <Route path="/signup" element = {<SignUp/>}/>
            <Route path="/" element = {<Home />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}


export {App}
