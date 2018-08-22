import React from 'react'
import '../../../../styles/SlideOut.css'

const COVER_TIME_SCALE = 250

/**
 * SlideOut
 * NOTE: CAVEAT - this component should only be used on a positioned element
 * @extends React
 * @prop {float} width the width of the containing div,
 * @prop {float} height the height of the containing div
 * @prop {string} bgColor the background color of the cover
 */
class SlideOut extends React.Component {
  constructor(props){
    super(props)
    this.aspectRatio = this.props.height / this.props.width
    this.state = {
      duration: 0.25,
      propToAnimate: 'width'
    }
  }

  render(){
    return (
      <div ref={this.div} className='hover-div' style={{position: 'absolute', top: 0, left: 0, height: `${this.props.height}px`, width: `${this.props.width}px`, backgroundColor: this.props.bgColor}}>
        {this.props.renderChildren()}
      </div>
    )
  }
}

export default SlideOut
