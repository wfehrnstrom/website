import React from 'react'
import '../../styles/SocialMediaBar.css'

const SocialMediaBar = (props) => {
  let {color, direction, width, height} = props
  if(!color){
    color = '#00000000'
  }
  return (
    <div className='social-media-bar' style={{width: width, height: height, flexDirection: direction, backgroundColor: color}}>
    </div>
  )
}

export default SocialMediaBar
