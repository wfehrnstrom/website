import React from 'react'
import '../../styles/image.css'
import {HOVER_COLOR, COVER_COLOR, TRANSITION_TYPE} from '../../constants'
import Modal from '@material-ui/core/Modal'
import memoize from 'memoize-one'
import {approximatelyEqual} from '../../constants/helpers'

/**
 * Image - image wrapper that adds custom transition in and out and modal view with image description
 * and auxiliary information on hover
 * @prop transitionIn - transition that brings image into view.  This will also be used as the transition
 * out if none is specified.  Valid transitions are specified by material ui docs
 * @prop transitionOut - transition that removes the image
 * @prop noSlideBox - if set, this flag indicates that no div will initially cover the image and slide away to reveal, as
 * it usually does
 * @prop src - the src image to use.  This should be an imported image, not a string
 * @prop desc - the description of the image
 * @prop date - the date the image was taken
 * @extends React
 */
class Image extends React.Component {
  constructor(props){
    super(props)
    this.imageContainerRef = React.createRef()
    this.expandCoverDiv = this.expandCoverDiv.bind(this)
    this.shrinkCoverDiv = this.shrinkCoverDiv.bind(this)
    this.showInfo = this.showInfo.bind(this)
    this.hideInfo = this.hideInfo.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      open: false,
    }
    this.resizeImage = this.resizeImage.bind(this)
  }

  componentDidMount(){
    let container = this.imageContainerRef.current
    let image = container.querySelector('.image')
    let coverDiv = container.querySelector('.image-transition-div')
    image.style.transition = ''
    coverDiv.style.transition = ''
    let {offsetWidth, offsetHeight} = container
    let aspectRatio = offsetHeight / offsetWidth
    let propToAnimate = (aspectRatio > 1) ? 'height' : 'width'
    let propToTrack = (aspectRatio > 1) ? 'offsetHeight' : 'offsetWidth'
    let transitionDuration = (aspectRatio > 1) ? (offsetHeight/200) : (offsetWidth/300)
    let hoverTransitionDuration = transitionDuration / 1.5
    let transitionString = `${propToAnimate} ${transitionDuration}s ease-in-out 0s`
    let hoverTransition = `${propToAnimate} ${hoverTransitionDuration}s ease-in-out 0s`
    this.setState({
      aspectRatio: container.offsetHeight / container.offsetWidth,
      propToAnimate: propToAnimate,
      propToTrack: propToTrack,
      visibilityTransition: transitionString,
      hoverTransition: hoverTransition,
      transitionDuration: transitionDuration,
      image: image,
      coverDiv: coverDiv,
      transitionType: TRANSITION_TYPE["NONE"],
    }, function(){
      window.addEventListener('resize', this.resizeImage)
      if(!this.props.noSlideBox){
        this.initDivIn()
        this.transitionIn()
      }
      else{
        this.shrinkCoverDiv()
        window.setTimeout(() => {
          this.setTransitionToHover()
        }, this.state.transitionDuration * 10)
      }
    }.bind(this))
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.resizeImage)
  }

  static getDerivedStateFromProps(props, state){
    if(state.prevSrc !== props.src){
      if(state.prevSrc === null){
        return {
          prevSrc: props.src
        }
      }
      return {
        prevSrc: props.src,
        newSrc: true,
      }
    }
    return null
  }

  componentDidUpdate(prevProps){
    if(prevProps.src !== this.props.src){
      this.setTransitionToNull()
      this.initDivIn()
      window.setTimeout(this.animateContainer, 300)
    }
  }

  setTransitionToCover(){
    this.setState({transitionType: TRANSITION_TYPE["COVER"]})
    this.state.coverDiv.style.backgroundColor = COVER_COLOR
    this.state.image.style.transition = this.state.visibilityTransition
    this.state.coverDiv.style.transition = this.state.visibilityTransition
    let text = this.imageContainerRef.current.querySelectorAll('.text')
    text.forEach(function(textObj){
      textObj.style.transition = 'opacity 0.6s ease-in-out'
    })
  }

  setTransitionToHover(){
    if(this.imageContainerRef.current){
      this.setState({transitionType: TRANSITION_TYPE["HOVER"]})
      this.state.coverDiv.style.backgroundColor = HOVER_COLOR
      this.state.image.style.transition = this.state.hoverTransition
      this.state.coverDiv.style.transition = this.state.hoverTransition
      let text = this.imageContainerRef.current.querySelectorAll('.text')
      text.forEach(function(textObj){
        textObj.style.transition = 'opacity 0.6s ease-in-out'
      })
    }
  }

  setTransitionToNull(){
    if(this.imageContainerRef.current){
      this.setState({transitionType: TRANSITION_TYPE["NONE"]}, function(){
        this.initDivIn()
        this.transitionIn()
      }.bind(this))
      this.state.image.style.transition = ''
      this.state.coverDiv.style.transition = ''
      let text = this.imageContainerRef.current.querySelectorAll('.text')
      text.forEach(function(textObj){
        textObj.style.transition = ''
      })
    }
  }

  expandCoverDiv(){
    this.state.coverDiv.style[this.state.propToAnimate] = `${this.imageContainerRef.current[this.state.propToTrack]}px`
  }

  initDivIn(){
    this.state.image.style[this.state.propToAnimate] = 0
    this.state.coverDiv.style[this.state.propToAnimate] = 0
  }

  /**
   * animateContainerExpand - the difference between this and expand div is that this
   * function also expands the image itself and the cover div.  if the image
   * width or height is non-zero, then this function does nothing.
   */
  animateContainer(){
    if(this.imageContainerRef && this.imageContainerRef.current){
      this.setTransitionToCover()
      window.setTimeout(this.shrinkCoverDiv, this.state.transitionDuration * 1000)
      window.setTimeout(this.setTransitionToHover.bind(this), 2000 * (this.state.transitionDuration))
      if(approximatelyEqual(parseFloat(this.state.coverDiv.style[this.state.propToAnimate]), 0) && approximatelyEqual(parseFloat(this.state.image.style[this.state.propToAnimate]), 0)){
        this.state.image.style[this.state.propToAnimate] = `${this.imageContainerRef.current[this.state.propToTrack]}px`
        this.state.coverDiv.style[this.state.propToAnimate] = `${this.imageContainerRef.current[this.state.propToTrack]}px`
      }
    }
  }

  resizeImage(){
    if(this.imageContainerRef.current){
      this.state.image.style.width = `${this.imageContainerRef.current.offsetWidth}px`
      this.state.image.style.height = `${this.imageContainerRef.current.offsetHeight}px`
    }
  }

  transitionIn(){
    this.state.image.onload = function(){
      window.setTimeout(this.animateContainer.bind(this), 300)
    }.bind(this)
  }

  shrinkCoverDiv(){
    this.state.coverDiv.style[this.state.propToAnimate] = 0
  }

  fadeInText(){
    Array.from(this.imageContainerRef.current.getElementsByClassName('text')).forEach(function(text){
      text.style.opacity = 100;
    })
  }

  fadeOutText(){
    Array.from(this.imageContainerRef.current.getElementsByClassName('text')).forEach(function(text){
      text.style.opacity = 0;
    })
  }

  showInfo(){
    if(this.state.transitionType === TRANSITION_TYPE["HOVER"]){
      this.expandCoverDiv()
      this.fadeInText()
    }
  }

  hideInfo(){
    if(this.state.transitionType === TRANSITION_TYPE["HOVER"]){
      this.fadeOutText()
      this.shrinkCoverDiv()
    }
  }

  openModal(){
    this.hideInfo()
    this.setState({open: true})
  }

  closeModal(){
    this.setState({open: false})
  }

  render(){
    return (
     <div className='image-container' ref={this.imageContainerRef} style={this.props.style}>
       <div style={(this.state.aspectRatio < 1) ? {height: '100%'} : {width: '100%'}} onMouseOver={this.showInfo} onMouseLeave={this.hideInfo}>
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
