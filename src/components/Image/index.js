import React from 'react'
import '../../styles/image.css'
import errorImg from '../../res/vector/image_error_msg.svg'

class Image extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: false,
    }
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount(){
    this.aspectRatio = this.props.height / this.props.width
  }

  handleError(){
    this.setState({error: true})
    if(this.props.handleError){
      this.props.handleError()
    }
  }

  getStyle(){
    return this.props.style
  }

  propsDefined(props){
    props.forEach(function(prop){
      if(!this.propDefined(prop)){
        return false
      }
    }.bind(this))
    return true
  }

  propDefined(prop){
    return (this.props[prop] !== undefined && this.props[prop] !== null)
  }

  render(){
    let wrapperStyle = this.getStyle()
    let imgStyle = (this.props.style && this.props.style.objectFit) ? {objectFit: this.props.style.objectFit} : null
    return (
      <div className = 'image-div' style={wrapperStyle}>
        <img className='image' style={imgStyle} onClick={this.openModal} src={this.state.error ? errorImg : this.props.src} onError={this.handleError} alt={this.props.alt ? this.props.alt : ''}/>
      </div>
    )
  }
}

export default Image
