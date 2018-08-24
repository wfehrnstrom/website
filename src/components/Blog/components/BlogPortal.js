import React from 'react'
import '../../../styles/BlogPortal.css'

const calculateTitleSize = (title) => {
  if(!title){
    return 0
  }
  return `${title.length * 7}%`
}

const BlogPortal = (props) => {
  let {title} = props.blog
  let {color} = props
  return (
    <div className='portal-wrapper' onClick={props.onClick} style={{backgroundColor: color, position: 'relative', width: '100%', height: '100%'}}>
      <div className='title-container' style={{width: '80%'}}>
        <div className='title'>{title}</div>
      </div>
      <div className='footer' style={{backgroundColor: color, width: '100%', height: '10px', position: 'absolute', bottom: 0}}></div>
    </div>
  )
}

export default BlogPortal
