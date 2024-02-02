import React from 'react'
import "../styles/img.css"
 

const Img = ({imgPath}:{imgPath:string}) => {
  return (
    <div className='img'>
        <img src={imgPath} width={"300"} height={"200"}/>
        <h3>Uploaded By: {}</h3>
        <h3>uploadedAt: {}</h3>
    </div>
  )
}

export default Img