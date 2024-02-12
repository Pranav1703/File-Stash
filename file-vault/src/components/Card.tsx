import axios from "axios"
import "../styles/card.css"
import fileDownload from "js-file-download"
import { LiaDownloadSolid } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";

type imgProps = {
  imgPath:string,
  user: string,
  date: string,
  time: string,
}

const Card = ({imgPath,user,date,time}:imgProps) => {
  
  const file = imgPath.split("/").pop() as string;
  
  const ext = file.slice(file.indexOf(".")+1);
  
  const imgExt = (ext === "png" || ext === "jpeg" || ext === "jpg" || ext === "gif" )?true:false

  const download = async(url: string,name: string)=>{
    
    try {
      const response = await axios.get(url,{responseType: 'blob'})
      console.log(response)

      fileDownload(response.data,name)
    

    } catch (error) {
      console.log("error while sending request or while downloading the file-----",error);
    }
  }

  const deleteFile = async()=>{
    
    try {

     const response = await axios.post(`http://localhost:3000/files/${file}`)
    console.log(response) 
    
    } catch (error) {

      console.log("error when trying to delete file ---- ",error)

    }
    console.log("delete btn presedn",file);
  }

  return (
    <div className='card'>
        
        {imgExt? 
            (

                <img className='img' src={imgPath} width={"300"} height={"200"}/>

            ):(
              
                <img className='textFile' src="src/assets/download-icon.png" alt="download" />
            
            )
          }
          <div className="info">
              
              <p className="userInfo">Uploaded By: {user}</p>
              <p className="date">Upload Date: {date}</p>
              <p className="time">Upload Time: {time}</p>
     
              <div className="btns">
                <button className='downloadBtn' onClick={()=>download(imgPath,file)}> 
                  <LiaDownloadSolid size={20}/> 
                </button>
                
                <button className="deleteBtn" onClick={()=>deleteFile()}> 
                  <FaTrashAlt size={20}/> 
                </button>
              </div>

          </div>
    </div>
  )
}

export default Card