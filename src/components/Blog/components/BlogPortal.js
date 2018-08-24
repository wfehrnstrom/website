import React from 'react'
import '../../../styles/BlogPortal.css'

const BlogPortal = (props) => {
  let {title} = props.blog
  let {color} = props
  // TODO: REMOVE BLACK as background color
  return (
    <div className='portal-wrapper' style={{backgroundColor: color, position: 'relative', width: '100%', height: '100%'}}>
      <div className='title-container'>
        <div className='title'>{title}</div>
      </div>
      <div className='footer' style={{backgroundColor: color, width: '100%', height: '10px', position: 'absolute', bottom: 0}}></div>
    </div>
  )
}

export default BlogPortal
