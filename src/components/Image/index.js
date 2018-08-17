import React from 'react'
import '../../styles/image.css'
import {HOVER_COLOR, COVER_COLOR, TRANSITION_TYPE} from '../../constants'
import Modal from '@material-ui/core/Modal'
import memoize from 'memoize-one'
import {approximatelyEqual} from '../../constants/helpers'

const COVER_TIME_SCALE = 250
const HOVER_TIME_SCALE = 250 * 1.5

class Image extends React.Component {
  constructor(props){
    super(props)
    this.containerRef = React.createRef()
    this.hoverIn = this.hoverIn.bind(this)
    this.hoverOut = this.hoverOut.bind(this)
    this.animationIn = this.animationIn.bind(this)
    this.animationOut = this.animationOut.bind(this)
    this.triggerAnimation = this.triggerAnimation.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.expandCover = this.expandCover.bind(this)
    this.shrinkCover = this.shrinkCover.bind(this)
    this.hoverMode = this.hoverMode.bind(this)
    this.coverMode = this.coverMode.bind(this)
    this.noTransitionMode = this.noTransitionMode.bind(this)
    this.onResize = this.onResize.bind(this)
    this.expandTimer = null
    this.shrinkTimer = null
    this.state = {
      open: false,
    }
  }

  componentDidMount(){
    this.container = this.containerRef.current
    this.image = this.container.querySelector('.image')
    this.imageCover = this.container.querySelector('.image-transition-div')
    this.aspectRatio = this.container.offsetHeight / this.container.offsetWidth
    let propToAnimate = (this.aspectRatio > 1) ? 'height' : 'width'
    let propToTrack = (this.aspectRatio > 1) ? 'offsetHeight' : 'offsetWidth'
    window.addEventListener('resize', this.onResize)
    this.setState({
      propToAnimate: propToAnimate,
      propToTrack: propToTrack,
    }, this.triggerAnimation)
  }

  triggerAnimation(){
    if(this.is(this.props.animatable)){
      this.zeroComponent()
      this.animationIn()
    }
    else{
      this.zeroComponent()
      this.expandImage(parseInt(this.container[this.state.propToTrack]))
      this.hoverMode()
    }
  }

  componentDidUpdate(prevProps){
    // if we receive a new image in this Image component
    //   1. cancel all previously running timers
    //   2. start our intro animation
    if(prevProps.src !== this.props.src && this.is(this.props.animatable)){
      this.noTransitionMode()
      this.cancelAllTimers()
      this.triggerAnimation()
    }
  }

  componentWillUnmount(){
    this.cancelAllCallbacks()
  }

  cancelAllCallbacks(){
    this.cancelAllTimers()
    window.removeEventListener('resize', this.onResize)
  }

  cancelAllTimers(){
    if(this.expandTimer){
      window.clearTimeout(this.expandTimer)
    }
    if(this.shrinkTimer){
      window.clearTimeout(this.shrinkTimer)
    }
  }

  onResize(){
    if(this.container){
      // calculate aspect ratio
      this.aspectRatio = this.container.offsetHeight / this.container.offsetWidth
      // set propToAnimate and propToTrack as needed
      if(this.aspectRatio > 1 && this.state.propToAnimate !== 'height'){
        this.setState({
          propToAnimate: 'height',
          propToTrack: 'offsetHeight'
        })
      }
      if(this.aspectRatio <= 1 && this.state.propToAnimate !== 'width'){
        this.setState({
          propToAnimate: 'width',
          propToTrack: 'offsetWidth'
        })
      }
      if(this.image && this.imageCover){
        this.image.style.width = `${this.container.offsetWidth}px`
        this.image.style.height = `${this.container.offsetHeight}px`
        if(this.state.propToAnimate === 'width'){
          this.imageCover.style.height = `${this.container.offsetHeight}px`
        }
        else{
          this.imageCover.style.width = `${this.container.offsetWidth}px`
        }
      }
    }
  }

  coverMode(){
    if(this.is(this.props.animatable)){
      // set declared mode
      this.mode = TRANSITION_TYPE["COVER"]
      // set transitions for image and image-cover
      this.setTransitions(this.mode)
      // set background color for image-cover to solid primary color
      this.setCoverColor(this.mode)
    }
  }

  hoverMode(){
    if(this.is(this.props.hoverable)){
      // set declared mode
      this.mode = TRANSITION_TYPE["HOVER"]
      // set transitions for image and image-cover
      this.setTransitions(this.mode)
      // set background color for image-cover
      this.setCoverColor(this.mode)
    }
  }

  noTransitionMode(){
    // set declared mode
    this.mode = TRANSITION_TYPE["NONE"]
    // set transitions for image and image-cover
    this.setTransitions(this.mode)
  }

  setTransitions(mode){
    if(this.imageCover && this.image){
      switch(mode){
        case TRANSITION_TYPE["HOVER"]:
          this.imageCover.style.transition = `${this.state.propToAnimate} ${this.container[this.state.propToTrack] / HOVER_TIME_SCALE}s ease-in-out`
          this.image.style.transition = ''
          return
        case TRANSITION_TYPE["COVER"]:
          this.imageCover.style.transition = `${this.state.propToAnimate} ${this.container[this.state.propToTrack] / COVER_TIME_SCALE}s ease-in-out`
          this.image.style.transition = `${this.state.propToAnimate} ${this.container[this.state.propToTrack] / COVER_TIME_SCALE}s ease-in-out`
          return
        case TRANSITION_TYPE["NONE"]:
          this.imageCover.style.transition = ''
          this.image.style.transition = ''
        default:
          return
      }
    }
  }

  setCoverColor(mode = null){
    if(this.imageCover){
      switch(mode){
        case TRANSITION_TYPE["HOVER"]:
          this.imageCover.style.backgroundColor = HOVER_COLOR
          return
        case TRANSITION_TYPE["COVER"]:
          this.imageCover.style.backgroundColor = COVER_COLOR
          return
        default:
          if(this.props.coverColor){
            this.imageCover.style.backgroundColor = this.props.coverColor
          }
      }
    }
  }

  expandComponent(toLength, onFinish){
    this.image.style[this.state.propToAnimate] = `${toLength}px`
    this.imageCover.style[this.state.propToAnimate] = `${toLength}px`
    if(onFinish){
      let duration = (toLength / COVER_TIME_SCALE) * 1000
      this.shrinkTimer = window.setTimeout(onFinish, duration)
    }
  }

  shrinkComponent(onFinish){
    let startLength = parseInt(this.image.style[this.state.propToAnimate])
    this.zeroComponent()
    if(onFinish){
      let duration = (startLength / COVER_TIME_SCALE) * 1000
      this.shrinkTimer = window.setTimeout(onFinish, duration)
    }
  }

  zeroComponent(){
    this.image.style[this.state.propToAnimate] = 0
    this.imageCover.style[this.state.propToAnimate] = 0
  }

  expandCover(toLength, onFinish){
    this.imageCover.style[this.state.propToAnimate] = `${toLength}px`
    if(onFinish){
      if(this.mode === TRANSITION_TYPE["COVER"]){
        let duration = (toLength / COVER_TIME_SCALE) * 1000
        this.expandTimer = window.setTimeout(onFinish, duration)
      }
      else if(this.mode === TRANSITION_TYPE["HOVER"]){
        let duration = (toLength / HOVER_TIME_SCALE) * 1000
        this.expandTimer = window.setTimeout(onFinish, duration)
      }
      else{
        onFinish()
      }
    }
  }

  expandImage(toLength, onFinish){
    this.image.style[this.state.propToAnimate] = `${toLength}px`
    if(onFinish){
      if(this.mode === TRANSITION_TYPE["COVER"]){
        let duration = (toLength / COVER_TIME_SCALE) * 1000
        this.expandTimer = window.setTimeout(onFinish, duration)
      }
      else if(this.mode === TRANSITION_TYPE["HOVER"]){
        let duration = (toLength / HOVER_TIME_SCALE) * 1000
        this.expandTimer = window.setTimeout(onFinish, duration)
      }
      else{
        onFinish()
      }
    }
  }

  shrinkCover(onFinish){
    let startLength = parseInt(this.imageCover.style[this.state.propToAnimate])
    this.imageCover.style[this.state.propToAnimate] = 0
    if(onFinish){
      if(this.mode === TRANSITION_TYPE["COVER"]){
        let duration = (startLength / COVER_TIME_SCALE) * 1000
        this.shrinkTimer = window.setTimeout(onFinish, duration)
      }
      else if(this.mode === TRANSITION_TYPE["HOVER"]){
        let duration = (startLength / HOVER_TIME_SCALE) * 1000
        this.shrinkTimer = window.setTimeout(onFinish, duration)
      }
      else{
        onFinish()
      }
    }
  }

  animationIn(){
    if(this.image && this.imageCover){
      // If not in cover mode, get into cover mode
      if(this.mode !== TRANSITION_TYPE["COVER"]){
        this.coverMode()
      }
      // Expand both the image-cover and image, schedule shrinking image cover
      let shrinkCoverWithCallback = this.shrinkCover.bind(null, this.hoverMode)
      this.expandComponent(this.container[this.state.propToTrack], shrinkCoverWithCallback)
    }
  }

  animationOut(){
    // If not in cover mode, get into cover mode
    // Shrink both the image-cover and image
    // go to null mode
  }

  textOpacity(level, textNodes){
    let nodes
    if(!textNodes || textNodes.length <= 0){
      nodes = this.container.querySelectorAll('.text')
    }
    nodes.forEach(function(textNode){
      textNode.style.opacity = level
    })
  }

  hoverIn(){
    // If not in hover mode, get into hover mode
    if(this.mode === TRANSITION_TYPE["HOVER"]){
      // expand image-cover
      this.expandCover(this.container[this.state.propToTrack])
      this.textOpacity(1)
    }
  }

  hoverOut(){
    // shrink image-cover
    if(this.mode === TRANSITION_TYPE["HOVER"]){
      this.shrinkCover()
      this.textOpacity(0)
    }
  }

  openModal(){
    if(this.is(this.props.clickable)){
      this.setState({open: true})
    }
  }

  closeModal(){
    this.setState({open: false})
  }

  is(able){
    return able !== false
  }

  styleBasedOnAspectRatio = memoize(function (aspectRatio){
    if(aspectRatio > 1){
      return {width: '100%'}
    }
    else{
      return {height: '100%'}
    }
  })

  render(){
    return (
     <div className='image-container' ref={this.containerRef} style={this.props.style}>
       <div style={this.styleBasedOnAspectRatio(this.aspectRatio)} onMouseOver={this.hoverIn} onMouseLeave={this.hoverOut}>
         <img className='image' onClick={this.openModal} src={this.props.src} alt={this.props.alt ? this.props.alt : ''}/>
         <div className='image-transition-div' onClick={this.openModal}></div>
       </div>
      <div className='text date'>{this.props.date.getFullYear()}</div>
      <div className='text desc'>{this.props.desc}</div>
      <Modal open={this.state.open} onClose={this.closeModal}>
        <div className='image-container' style={{position: 'absolute', width: '90vw', height: '90vh', top: '5vh', left: '5vw'}}>
          <img className='image' src={this.props.src} alt={this.props.alt ? this.props.alt : ''}/>
          <div className='text date'>{this.props.date.getFullYear()}</div>
          <div className='text desc'>{this.props.desc}</div>
        </div>
      </Modal>
     </div>
    )
  }
}

export default Image
