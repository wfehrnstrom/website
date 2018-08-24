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
    if(this.props.width !== undefined && this.props.height !== undefined){
      return {
        ...this.props.style,
        width: `${this.props.width}px`,
        height: `${this.props.height}px`,
      }
    }
    else if(this.props.style){
      return this.props.style
    }
    else{
      return {
        width: '100%',
        height: '100%',
      }
    }
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
