import React from 'react'
import {getDisplayName} from '../../../constants/helpers'

function withHover(Component, Overlay = null){
  class withHover extends React.Component {
    constructor(props){
      super(props)
      this.onHover = this.onHover.bind(this)
      this.onUnhover = this.onUnhover.bind(this)
      this.shrink = this.shrink.bind(this)
      this.shrinkTimer = null
      this.state = {
        coverSize: [0, 0],
      }
      this.containerRef = React.createRef()
    }

    componentDidMount(){
      this.hoverDiv = this.containerRef.current.querySelector('.hoverDiv')
      if(this.hoverDiv){
        this.setState({coverSize: this.shrink()})
      }
    }

    componentDidUpdate(){
      if(this.hoverDiv && !this.hoverDiv.style.transitionProperty){
        this.hoverDiv.style.transitionProperty = 'width,height'
        this.hoverDiv.style.transitionTimingFunction = 'ease-in-out'
      }
    }

    getBounds(){
      if(this.containerRef && this.containerRef.current){
        return [this.containerRef.current.offsetWidth, this.containerRef.current.offsetHeight]
      }
      return [0, 0]
    }

    expand(){
      return this.getBounds()
    }

    shrink(){
      let [width, height] = this.getBounds()
      let aspectRatio = height / width
      if(!isNaN(aspectRatio) && aspectRatio !== Infinity){
        if(aspectRatio > 1){
          return [width, 0]
        }
        else{
          return [0, height]
        }
      }
      return [0, 0]
    }

    calculateDurationInSec(){
      let [width, height] = this.getBounds()
      let aspectRatio = height / width
      if(!isNaN(aspectRatio) && aspectRatio !== Infinity){
        if(aspectRatio > 1){
          return height / 300
        }
        else{
          return width / 300
        }
      }
      return 0
    }

    overlayActionOnHover(){
      let textQuery = this.containerRef.current.querySelectorAll('.text')
      textQuery.forEach(function(pieceOfText){
        pieceOfText.style.opacity = 1
      })
    }

    overlayActionOnUnhover(){
      let textQuery = this.containerRef.current.querySelectorAll('.text')
      textQuery.forEach(function(pieceOfText){
        pieceOfText.style.opacity = 0
      })
    }

    onHover(){
      if(this.hoverDiv){
        let duration = this.calculateDurationInSec()
        this.hoverDiv.style.transitionDuration = `${duration}s`
        this.setState({coverSize: this.expand()})
        this.overlayActionOnHover()
      }
    }

    onUnhover(){
      if(this.hoverDiv){
        let duration = this.calculateDurationInSec()
        this.hoverDiv.style.transitionDuration = `${duration}s`
        this.setState({coverSize: this.shrink()})
        this.overlayActionOnUnhover()
      }
    }

    render(){
      return (
        <div ref={this.containerRef} style={{position: 'relative', width: '100%', height: '100%'}} onMouseEnter={this.containerRef && this.containerRef.current ? this.onHover : () => {}} onMouseLeave={this.containerRef && this.containerRef.current ? this.onUnhover : () => {}}>
          <Component {...this.props} style={{...this.props.style, width: '100%', height: '100%'}}/>
          <div className='hoverDiv' style={{width: `${this.state.coverSize[0]}px`, height: `${this.state.coverSize[1]}px`, backgroundColor: '#24202080', position: 'absolute', top: 0, left: 0, zIndex: 6, ...this.props.style}}></div>
          <div className='info-div' style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 7}}>
            {Overlay && <Overlay className='overlay'/>}
          </div>
        </div>
      )
    }
  }
  withHover.displayName = `withHover(${getDisplayName(Component)})`
  return withHover
}

export default withHover
