import React from 'react'
import memoize from 'memoize-one'

class Video extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      types: [],
    }
  }

  renderSources(){
    return this.props.sources.map(function(source, i){
      return <source key={i} src={source} type={this.state.types[i]}/>
    }.bind(this))
  }

  componentDidMount(){
    let types = []
    let prefix = 'video/'
    for(let i = 0; i < this.props.sources.length; i++){
      let source = this.props.sources[i]
      let vidtype = prefix + source.substring(source.lastIndexOf('.') + 1, source.length)
      types.push(vidtype)
    }
    this.videoStyle(this.props)
    this.setState({
      types: types
    })
  }

  videoStyle = memoize((style, parallax) => {
    let newStyle
    if(style){
      newStyle = {...style}
      if(parallax && (newStyle.position === 'fixed' || !newStyle.position)){
        newStyle.position = 'fixed'
      }
      newStyle.width = newStyle.width ? newStyle.width : '100%'
      newStyle.height = newStyle.height ? newStyle.height : '100%'
      newStyle.zIndex = newStyle.zIndex ? newStyle.zIndex : -2
      return newStyle
    }
    return {width: '100%', height: '100%', zIndex: -2}
  })

  componentWillReceiveProps(nextProps){
    this.videoStyle(nextProps)
  }

  render(){
    return (
      <video muted autoPlay loop style={this.videoStyle(this.props.style, this.props.parallax)}>
        {this.renderSources()}
      </video>
    )
  }
}

export default Video
