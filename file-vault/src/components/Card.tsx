import axios from "axios"
import "../styles/card.css"
import fileDownload from "js-file-download"
import { blob } from "stream/consumers"

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

  const clickHandler = ()=>{
    download(imgPath,file)
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
        <button onClick={clickHandler}>download</button>
        <p>Uploaded By: {user}</p>
        <p>upload Date: {date}</p>
        <p>Upload Time: {time}</p>
    </div>
  )
}

export default Card