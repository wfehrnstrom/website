import React from 'react'

class ToolBar extends React.Component {

  render(){
    return (
      <div id={this.props.id} className='toolbar-container' style={{display: 'flex', flexDirection: this.props.direction, ...this.props.style}}>
        {this.props.children}
      </div>
    )
  }
}

export default ToolBar
