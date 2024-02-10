import React from 'react'
import "../styles/card.css"
 
type imgProps = {
  imgPath:string,
  user: string,
  date: string,
  time: string,
}

const Card = ({imgPath,user,date,time}:imgProps) => {

  const ext = imgPath.slice(imgPath.indexOf(".")+1);
  console.log("extention := ",ext);

  let imgExt:boolean = false;
  

  if(ext === "png" || ext === "jpeg" || ext === "jpg" || ext === "gif" ){
    imgExt = true;
  }

  return (
    <div className='card'>
        <a href={imgPath} download="download" target='_blank' rel='noreferrer'>
        {imgExt? 
            (

                <img className='img' src={imgPath} width={"300"} height={"200"}/>

            ):(
              
                <img className='textFile' src="src/assets/download-icon.png" alt="download" />
            
            )
          }
        </a>
        <p>Uploaded By: {user}</p>
        <p>upload Date: {date}</p>
        <p>Upload Time: {time}</p>
    </div>
  )
}

export default Card