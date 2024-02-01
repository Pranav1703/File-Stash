import React from 'react'
import "../styles/img.css"
 

const Img = ({imgPath}:{imgPath:string}) => {
  return (
    <div className='img'>
        <img src={imgPath} width={"300"}/>
    </div>
  )
}

export default Img