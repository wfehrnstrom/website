import React from 'react'
import IconButton from '@material-ui/core/IconButton'

class ToolBarItem extends React.Component {
  render(){
    return (
      <IconButton style={this.props.style}>
        {this.props.children}
      </IconButton>
    )
  }
}

export default ToolBarItem
