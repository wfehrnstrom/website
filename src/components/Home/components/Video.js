import React from 'react'

const VIDEO_PREFIX =  'video/'

class Video extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      types: [],
      loaded: false,
    }
    this.setStateOnLoad = this.setStateOnLoad.bind(this)
  }

  componentDidMount(){
    this.videoStyle(this.props)
    this.setState({
      types: this.typesFromFiles(this.props.sources)
    })
    this.loadCheck = setInterval(this.setStateOnLoad, 500)
  }

  setStateOnLoad(){
    if(this.videoLoaded()){
      this.setState({loaded: true})
      clearInterval(this.loadCheck)
    }
  }

  typesFromFiles(files){
    let types = []
    if(files){
      types = files.map(function(filename){
        return this.createTypeFromFilename(filename, VIDEO_PREFIX)
      }.bind(this))
    }
    return types
  }

  createTypeFromFilename(filename, prefix = ''){
    let type = prefix + filename.substring(filename.lastIndexOf('.') + 1, filename.length)
    return type
  }

  videoLoaded(){
    let vidEl = document.querySelector('.' + this.props.className)
    if(vidEl){
      return vidEl.readyState >= 3
    }
    return true
  }


  videoStyle(){
    let newStyle = this.applyPropStyles()
    if(this.shouldBeParallax(newStyle)){
      newStyle = this.setStylePosition(newStyle, 'fixed')
    }
    newStyle = this.setZIndexIfUndefined(newStyle, -2)
    return newStyle
  }

  setZIndexIfUndefined(style, newIndex){
    if(!style){
      style = {}
    }
    if(!style.zIndex){
      style.zIndex = newIndex
    }
    return style
  }

  setStylePosition(style, positionVal){
    style.position = positionVal
    return style
  }

  applyPropStyles(){
    if(this.props.style){
      return {...this.props.style}
    }
    return {}
  }

  shouldBeParallax(styles){
    if(this.props.parallax && (!styles || !styles.position || styles.position === 'fixed')){
      return true
    }
    return false
  }

  renderSources(){
    return this.props.sources.map(function(source, i){
      return <source key={source} src={source} type={this.state.types[i]}/>
    }.bind(this))
  }

  render(){
    return (
      <div style={{width: '100%', ...this.props.containerStyle}}>
        <video className={this.props.className} muted={this.props.muted ? this.props.muted : true} autoPlay={this.props.autoplay ? this.props.autoplay : true} loop={this.props.loop ? this.props.loop : true} style={this.videoStyle(this.props.parallax)}>
          {this.renderSources()}
        </video>
        {(!this.state.loaded  && this.props.thumbnail) && <img className={this.props.className} style={{zIndex: -1, objectFit: 'cover', ...this.props.thumbnailStyles}} src={this.props.thumbnail} alt='Video Thumbnail'/>}
      </div>
    )
  }
}

export default Video
