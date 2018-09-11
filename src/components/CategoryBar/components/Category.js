import React from 'react'

class Category extends React.Component {
  constructor(props){
    super(props)
  }

  onHover(){
    // Material UI Dropdown hover effect here
  }

  render(){
    let {name, percentageWidth, color, toggleActive} = this.props
    return (
      <div className='category' key={name} style={{width: percentageWidth, height: '100%', backgroundColor: color}} onClick={toggleActive}>
      </div>
    )
  }
}

export default Category
