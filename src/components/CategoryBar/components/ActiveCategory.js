import React from 'react'
import '../../../styles/ActiveCategory.css'

const ActiveCategory = (props) => {
  let height = 0
  let name = props.name ? 'Viewing ' + props.name[0].toUpperCase() + props.name.substr(1) + ' Blog Posts' : ''
  let borderBottomWidth
  if(props.name && props.bgColor){
    height = '75%'
    borderBottomWidth = '2px'
  }
  else{
    borderBottomWidth = 0
  }
  return (
    <div className='focused-div' style={{transition: 'all 0.25s ease-in-out', width: '100%', borderColor: props.bgColor, height: height, borderBottomWidth: borderBottomWidth, ...props.style}}>
      <div className='now-viewing' style={{color: props.bgColor}}>{name}</div>
    </div>
  )
}

export default ActiveCategory
