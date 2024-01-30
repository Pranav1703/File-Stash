import Header from "./Header"
import Img from "./Img"
import "../styles/home.css"
import { useState } from "react"
import axios from "axios"


const Home = () => {
  
  const [file,setFile] = useState<File>();
  
  const fileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files![0];
    if(!file){
      console.log("no file provided")
    }
    console.log(file);
    setFile(file)
  }

  const submitHandler = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    try {
      const formData = new FormData();
      if(file){
        formData.append("uploadedFile",file)
        for (const pair of formData.entries()) {
          console.log(pair[0], ":",pair[1]);
        }
      }
      const response = await axios.post("http://localhost:3000/upload",formData)
      console.log("response from server -----------------------------------------------------\n",response.data)
    } catch (error) {
      console.log("post request failed :=",error)
    }
    //enctype="multipart/form-data"
  }
  
  return (
    <>
        <Header/>
        <div className="main">
            <div className="addFile">
              <form >
                <input type="file" multiple={false} onChange={fileChange}/>
                <button type="submit" onClick={submitHandler}>upload</button>
              </form>
            </div>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
            <Img/>
        </div>
    </>
  )
}

export default Home