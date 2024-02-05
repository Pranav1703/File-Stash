import React from 'react'
import "../styles/img.css"
 
type imgProps = {
  imgPath:string,
  user: string,
  date: string,
  time: string,
}

const Img = ({imgPath,user,date,time}:imgProps) => {
  return (
    <div className='img'>
        <img src={imgPath} width={"300"} height={"200"}/>
        <p>Uploaded By: {user}</p>
        <p>upload Date: {date}</p>
        <p>Upload Time: {time}</p>
    </div>
  )
}

export default Img