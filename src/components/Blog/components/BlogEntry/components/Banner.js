import React from 'react'
import '../../../../../styles/Banner.css'

class Banner extends React.Component {
  constructor(props){
    super(props)
    this.bannerContainer = React.createRef()
    this.startAnimation = this.startAnimation.bind(this)
  }

  componentDidMount(){
    this.setBannerToWidth(0)
    window.setTimeout(this.startAnimation, 50)
  }

  setBannerToWidth(width){
    this.bannerContainer.current.children[0].style.width = 0
  }

  startAnimation(){
    this.bannerContainer.current.children[0].style.width = '100%'
  }

  render(){
    return (
      <div className='banner-container' style={this.props.style} ref={this.bannerContainer}>
        <div className='banner' style={{height: '100%', backgroundColor: this.props.color}}></div>
      </div>
    )
  }
}

export default Banner
