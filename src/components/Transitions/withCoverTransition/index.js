import React from 'react'
import ReactDOM from 'react-dom'
import memoize from 'memoize-one'
import '../../../styles/CoverDiv.css'
import {getDisplayName} from '../../../constants/helpers'

const COVER_TRANSITION_TIME_TO_TRIGGER = 300

function withCoverTransition(WrappedComponent){
  class withCoverTransition extends React.Component {
    constructor(props){
      super(props)
      this.triggerAnimation = this.triggerAnimation.bind(this)
      this.shrinkCover = this.shrinkCover.bind(this)
      this.removeThis = this.removeThis.bind(this)
      this.setComponentRef = this.setComponentRef.bind(this)
      this.onWindowResize = this.onWindowResize.bind(this)
      this.animationTriggered = null
      this.coverShrinking = null
      this.doneHandler = null
      this.state = {
        over: false,
      }
      this.containerRef = React.createRef()
      this.componentRef = null
    }

    divSize(expanding = false){
      let container = this.containerRef.current
      if(container){
        let [width, height] = this.getDim()
        let aspectRatio = height / width
        // height is variable, width is constant
        // else, width is variable, height is constant
        if(width && height){
          if(expanding){
            return [width, height]
          }
          else{
            if(aspectRatio > 1){
              return [width, 0]
            }
            else{
              return [0, height]
            }
          }
        }
      }
      else{
        console.error("Height and Width must be initialized in order to calculate the div size in withCoverTransition")
      }
    }

    getDim(){
      return [this.containerRef.current.offsetWidth, this.containerRef.current.offsetHeight]
    }

    removeThis(){
      this.setState({over: true})
    }

    triggerAnimation(){
      let [width, height] = this.getDim()
      let aspectRatio = height / width
      this.setState({coverSize: this.divSize(true), wrappedComponentSize: this.divSize(true)}, function(){
        this.addTransitionToComponent()
        this.resizeComponent()
      }.bind(this))
      let duration = this.calculateDuration() * 1000
      this.coverShrinking = window.setTimeout(this.shrinkCover, duration)
    }

    shrinkCover(){
      let [width, height] = this.getDim()
      let aspectRatio = height / width
      this.setState({coverSize: this.divSize(false)})
      let duration = this.calculateDuration() * 1000
      this.doneHandler = window.setTimeout(this.removeThis, duration)
    }

    calculateDuration(){
      let [width, height] = this.getDim()
      let aspectRatio = height / width
      if(aspectRatio > 1){
        return height / 250
      }
      else{
        return width / 250
      }
    }

    toStyle(props, descriptors){
      let styleArr = props.map(function(prop){
        // if number or float, add px to string
        if(!isNaN(prop) && prop.toString().indexOf('.') !== -1 || Number.isInteger(prop)){
          if(prop === 0){
            return prop
          }
          else{
            return `${prop}px`
          }
        }
        else{
          return prop
        }
      })
      let style = new Object()
      styleArr.forEach(function(styleVal, i){
        style[descriptors[i]] = styleVal
      })
      return style
    }

    resizeComponent(){
      let node = ReactDOM.findDOMNode(this.componentRef)
      if(node){
        node.style.width = `${this.state.wrappedComponentSize[0]}px`
        node.style.height = `${this.state.wrappedComponentSize[1]}px`
      }
    }

    addTransitionToComponent(){
      let node = ReactDOM.findDOMNode(this.componentRef)
      if(node){
        node.style.transitionProperty = 'width,height'
        node.style.transitionDuration = `${this.calculateDuration()}s`
      }
    }

    componentDidMount(){
      this.setState({wrappedComponentSize: this.divSize(false), coverSize: this.divSize(false)}, function(){
          this.resizeComponent()
          this.animationTriggered = window.setTimeout(this.triggerAnimation, COVER_TRANSITION_TIME_TO_TRIGGER)
          window.addEventListener('resize', this.onWindowResize)
      }.bind(this))
    }

    componentWillUnmount(){
      window.clearTimeout(this.animationTriggered)
      window.clearTimeout(this.coverShrinking)
      window.clearTimeout(this.removeThis)
      window.removeEventListener('resize', this.onWindowResize)
    }

    definedSize(){
      return (this.state.wrappedComponentSize && this.state.coverSize && this.state.wrappedComponentSize.length === 2 && this.state.coverSize.length === 2)
    }

    forciblyResizeNode(node, width, height){
      node.style.width = `${width}px`
      node.style.height = `${height}px`
    }

    resizeCoverIfExpanding(){
      if(this.state.coverSize && this.state.coverSize.indexOf(0) === -1){
        this.setState({coverSize: this.getDim()})
      }
    }

    onWindowResize(){
      let node = ReactDOM.findDOMNode(this.componentRef)
      if(node){
        let dimensions = this.getDim()
        if(this.state.over){
          this.forciblyResizeNode(node, dimensions[0], dimensions[1])
        }
        else{
          this.resizeCoverIfExpanding()
        }
      }
    }

    setComponentRef(ref){
      this.componentRef = ref
      this.resizeComponent()
    }

    bgColor(){
      return this.props.bgColor ? this.props.bgColor : '#FF5959'
    }

    render(){
      let divContent = null
      if(this.definedSize()){
        let transitionDuration = this.calculateDuration()
        if(!this.state.over){
          let coverStyleProps = [this.state.coverSize[0], this.state.coverSize[1], `${transitionDuration}s`]
          let coverDescriptors = ['width', 'height', 'transitionDuration']
          divContent = (
            <div>
              <WrappedComponent ref={this.setComponentRef} {...this.props}/>
              <div className='cover-div' style={{width: `${this.state.coverSize[0]}px`, height: `${this.state.coverSize[1]}px`, transitionDuration: `${transitionDuration}s`, backgroundColor: this.bgColor()}}></div>
            </div>
          )
        }
        else{
          divContent = <WrappedComponent ref={this.setComponentRef} style={{transitionDuration: `${transitionDuration}s`, ...this.props.style}} {...this.props}/>
        }
      }
      return (
        <div style={{width: '100%', height: '100%', position: 'relative'}} ref={this.containerRef}>
          {divContent}
        </div>
      )
    }
  }
  withCoverTransition.displayName = `withCoverTransition(${getDisplayName(WrappedComponent)})`
  return withCoverTransition
}

export default withCoverTransition
