import React from 'react'
import {getDisplayName} from '../../../constants/helpers'

function withLazyLoad(Component){
  class WrappedComponent extends React.Component {
    constructor(props){
      super(props)
      this.lazyLoadRef = React.createRef()
      this.setLoadState = this.setLoadState.bind(this)
      this.state = {
        shouldLoad: false,
      }
    }

    componentDidMount(){
      this.onScroll = window.addEventListener('scroll', this.setLoadState)
      this.setLoadState()
    }

    componentWillUnmount(){
      window.removeEventListener('scroll', this.setLoadState)
    }

    refLoaded(){
      return (this.lazyLoadRef && this.lazyLoadRef.current)
    }

    setLoadState(){
      if(this.shouldLoad()){
        this.setState({shouldLoad: true})
      }
    }

    shouldLoad(){
      if(this.refLoaded() && !this.state.shouldLoad){
        let viewportPos = this.getViewportPos()
        let el = this.lazyLoadRef.current
        let elementDistanceFromDocumentTop = this.getOffsetFromDocTop(el)
        if(elementDistanceFromDocumentTop < viewportPos){
          return true
        }
      }
      return false
    }

    getViewportPos(){
      if(this.props.loadAtTop){
        return window.scrollY
      }
      else{
        return window.innerHeight + window.scrollY
      }
    }

    getOffsetFromDocTop(el){
      let sum = 0
      while(el){
        sum += el.offsetTop
        el = el.offsetParent
      }
      return sum
    }

    render(){
      return (
        <div ref={this.lazyLoadRef} style={this.props.style ? this.props.style : {width: '100%', height: '100%'}}>
          {this.state.shouldLoad && <Component {...this.props}/>}
        </div>
      )
    }
  }
  WrappedComponent.displayName = `withLazyLoad(${getDisplayName(Component)})`
  return WrappedComponent
}

export default withLazyLoad
