import Header from "./Header"
import Card from "./Card"
import "../styles/home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import {current_user} from "./Login"
import { FaFile } from "react-icons/fa";


const Home = () => {
  
  const [file,setFile] = useState<File | undefined>();
  const [isImg,setIsImg] = useState<boolean>(false);
  const [isFile,setIsFile] = useState<boolean>(false);


  type fileData = {
    id: string,
    file: string,
    user: string,
    date: string,
    time: string,
  }
  
  const [dataArray,setDataArray] = useState<fileData[] | []>([])
  const [url,setUrl] = useState<string>("")

  const fileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  
    const file = e.target.files![0];
    if(!file){
      console.log("no file provided")
    }else{
      const ext = file.name.split(".").pop();
      console.log("extention:",ext)

      if(ext === "png" || ext === "jpeg" || ext === "jpg" || ext === "gif" ){
        setIsImg(true);
      }
      else{
        setIsFile(true);
      }
    
      setFile(file)
      console.log("file state changed",file);
  
      const url = URL.createObjectURL(file);
      setUrl(url);
    }
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
    const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = ''; 
    }
   
    setFile(undefined);
    setIsFile(false);
    setIsImg(false);
    setUrl("")
  
  }

  const getData = async() =>{

    try {
      const response = await axios.get("http://localhost:3000/files/all")
      
      console.log("Status of search :",response.data.searchStatus);
      console.log("function called in useEffect hook")
      
      
      if(response.data.searchStatus === true && response.data.dataArray.length!== dataArray!.length){
        
        setDataArray(response.data.dataArray)
        console.log("dataArray is set!")
        
      }else if(response.data.searchStatus === false && dataArray.length!==0){

        setDataArray([]);

      }
      
      console.log("dataArray in client-----",dataArray)

      // console.log("array of docs --- ", imgDataArray)
      
    } catch (error) {
      console.log("error while sending request or when checking the response -- ",error)
    }
    
  }

  const deleteFile = async(filename: string)=>{
    
    try {

     const response = await axios.post(`http://localhost:3000/files/${filename}`)
     console.log(response.data) 
    
    } catch (error) {

      console.log("error when trying to delete file ---- ",error)

    }
    
    getData();
  }
  
  
  
  useEffect(() => {
    
    
      getData();

      // const blob = new Blob([JSON.stringify(file?.arrayBuffer)],{type:"image/jpeg"})
    
  }, [file,dataArray]);
  
  console.log("blob converted to url---",url)
  
  return (
    <>
        <Header/>
        <div className="main">

            <div className="addFile">
              <form >
                <input id ="fileInput" type="file" multiple={false} onChange={fileChange}/>
                {
                    isFile  && 
                                    <div className="filePreview">
                                        <FaFile size={140} />
                                    </div>
                }
                {isImg  && <img className="imgPreview" src={url}/>}
                {file && <button className="submit" type="submit" onClick={submitHandler}>SUBMIT</button>}
              </form>
              
            </div> 
            
            { dataArray?.map( (element:fileData) =>

               <Card key = {element.id} 
                    imgPath={`http://localhost:3000/${element.file}`} 
                    user={element.user} 
                    date={element.date} 
                    time={element.time}
                    delFunc={deleteFile}
                />

            )}
        </div>
    </>
  )
}

export default Home