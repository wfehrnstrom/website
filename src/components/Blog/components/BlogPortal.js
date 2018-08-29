import React from 'react'
import Fade from '@material-ui/core/Fade'
import '../../../styles/BlogPortal.css'

function renderBackgroundImgIfFound(blog){
  if(blog && blog.backgroundImg){
    return (
      <div className='background-img'>
        <img src={blog.backgroundImg} style={{width: '100%', height: '100%'}}alt={`Background Image for ${blog.title}`}/>
      </div>
    )
  }
}

function shouldFade(props){
  return props && props.fade
}

function renderPortal(props){
  let {title} = props.blog
  let {color} = props
  return (
    <div className='portal-wrapper' onClick={props.onClick} style={{backgroundColor: color, position: 'relative', width: '100%', height: '100%'}}>
      {renderBackgroundImgIfFound(props.blog)}
      <div className='title-container' style={{width: '80%'}}>
        <div className='title'>{title}</div>
      </div>
      <div className='footer' style={{backgroundColor: color, width: '100%', height: '10px', position: 'absolute', bottom: 0}}></div>
    </div>
  )
}

function renderPortalWithFade(props){
  return (
    <Fade in={true} timeout={1000}>
      {renderPortal(props)}
    </Fade>
  )
}

const BlogPortal = (props) => {
  let {title} = props.blog
  let {color} = props
  let portal = (shouldFade(props) ? renderPortalWithFade(props) : renderPortal(props))
  return portal
}

export default BlogPortal
