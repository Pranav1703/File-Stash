import Header from "./Header"
import Card from "./Card"
import "../styles/home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import {current_user} from "./Login"
import { IoMdAdd } from "react-icons/io";

const Home = () => {
  
  const [file,setFile] = useState<File | undefined>();

  type fileData = {
    id: string,
    file: string,
    user: string,
    date: string,
    time: string,
  }
  
  const [dataArray,setDataArray] = useState<fileData[]>([])

  // let imgPathArray:fileData[] = []


  const fileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files![0];
    if(!file){
      console.log("no file provided")
    }

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
    
    setFile(undefined)
  }

  const getData = async() =>{
    try {
      const response = await axios.get("http://localhost:3000/files/all")
      console.log("Status of search :",response.data.searchStatus);
      console.log("function called in useEffect hook")
      if(response.data.searchStatus === true && response.data.dataArray.length!== dataArray.length){
        console.log("dataArray is set!")
        console.log("response array:",response.data.dataArray)
        setDataArray(response.data.dataArray)
        
      }
      // setImgDataArray(response.data.dataArray)

      // console.log("array of docs --- ", imgDataArray)
      
    } catch (error) {
      console.log("error while sending request -- ",error)
    }
    
  }

  useEffect(() => {
    
    
      getData();
    
    
  }, [file,dataArray])
  return (
    <>
        <Header/>
        <div className="main">
            <div className="addFile">
              <form >
                <input type="file" multiple={false} onChange={fileChange}/>
                <button type="submit" onClick={submitHandler}><IoMdAdd size={260} /></button>
              </form>
            </div>
            
            { dataArray?.map( (element:fileData) =>

               <Card key = {element.id} 
                    imgPath={`http://localhost:3000/${element.file}`} 
                    user={element.user} 
                    date={element.date} 
                    time={element.time}
                />
            )}
        </div>
    </>
  )
}

export default Home