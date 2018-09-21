import React from 'react'
import Fade from '@material-ui/core/Fade'
import '../../../styles/BlogPortal.css'

class BlogPortal extends React.Component {
  renderBackgroundImgIfFound(blog){
    if(blog && blog.backgroundImg){
      return (
        <div className='background-img'>
          <img src={blog.backgroundImg} style={{width: '100%', height: '100%'}} alt={`Background for ${blog.title}`}/>
        </div>
      )
    }
  }

  shouldFade(){
    return this.props && this.props.fade
  }

  renderPortal(){
    let {title} = this.props.blog
    let {color} = this.props
    return (
      <div className='portal-wrapper' onClick={this.props.onClick} style={{backgroundColor: color, position: 'relative', width: '100%', height: '100%'}}>
        {this.renderBackgroundImgIfFound(this.props.blog)}
        <div className='title-container' style={{width: '80%'}}>
          <div className='title'>{title}</div>
        </div>
        <div className='footer' style={{backgroundColor: color, width: '100%', height: '10px', position: 'absolute', bottom: 0}}></div>
      </div>
    )
  }

  renderPortalWithFade(){
    return (
      <Fade in={true} timeout={500}>
        {this.renderPortal(this.props)}
      </Fade>
    )
  }

  render(){
    if(this.shouldFade()){
      return this.renderPortalWithFade()
    }
    else{
      return this.renderPortal()
    }
  }
}

export default BlogPortal
