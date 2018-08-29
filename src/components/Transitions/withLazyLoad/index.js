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
      window.addEventListener('scroll', this.setLoadState)
      this.setLoadState()
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
      if(this.refLoaded()){
        let el = this.lazyLoadRef.current
        let viewportBottomPos = window.innerHeight + window.scrollY
        let elementDistanceFromDocumentTop = this.getOffsetFromDocTop(el)
        if(elementDistanceFromDocumentTop < viewportBottomPos){
          return true
        }
      }
      return false
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
