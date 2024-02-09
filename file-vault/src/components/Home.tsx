import Header from "./Header"
import Img from "./Img"
import "../styles/home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import {current_user} from "./Login"


const Home = () => {
  
  const [file,setFile] = useState<File | undefined>();

  type fileData = {
    id: string,
    file: string,
    user: string,
    date: string,
    time: string,
  }
  
  const [imgDataArray,setImgDataArray] = useState<fileData[]>([])

  // let imgPathArray:fileData[] = []


  const fileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files![0];
    if(!file){
      console.log("no file provided")
    }
    console.log("file set",file);
    setFile(file)
  }

  const submitHandler = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()

    try {
      const formData = new FormData();

      if(file){
        formData.append("uploadedFile",file)
        formData.append("user",current_user);
        
        for (const pair of formData.entries()) {
          console.log(pair[0], ":",pair[1]);
        }
      }

      const response = await axios.post("http://localhost:3000/upload",formData)

      console.log("response from server -----------------------------------------------------\n",response.data.status)

    } catch (error) {
      console.log("post request failed :=",error)
    }
    //enctype="multipart/form-data"
    setFile(undefined)
  }

  const getData = async() =>{
    try {
      const response = await axios.get("http://localhost:3000/getFiles")
      console.log("Status of search :",response.data.searchStatus);
      if(response.data.searchStatus === true){
        console.log(response.data.dataArray)
        setImgDataArray(response.data.dataArray)
        
      }
      // setImgDataArray(response.data.dataArray)

      // console.log("array of docs --- ", imgDataArray)
      
    } catch (error) {
      console.log("error while sending request -- ",error)
    }
    
  }

  useEffect(() => {
    
    // axios.get("http://localhost:3000/getFiles")
    // .then(response =>{
    //   console.log("Status of search :",response.data.searchStatus);
    //   if(response.data.searchStatus === true){
    //     imgPathArray = response.data.dataArray
    //     // setImgDataArray(response.data.dataArray)
    //   }
    //   console.log("array of docs --- ", imgPathArray)
    //   // console.log("array of docs --- ", imgDataArray)
    // })
    // .catch(err => console.log("error while sending request -- ",err))

    getData();

  }, [file])

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
            { imgDataArray?.map( (element:fileData) =>

               <Img key = {element.id} 
                    imgPath={`http://localhost:3000/${element.file}`} 
                    user={element.user} 
                    date={element.date} 
                    time={element.time}
                />
  
            )}
            
            {/* <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/>
            <Img imgPath={"http://localhost:3000/uploadedFile-1706769191404.jpg"}/> */}
        </div>
    </>
  )
}

export default Home