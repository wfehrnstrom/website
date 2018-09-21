import React from 'react'
import '../../../styles/ActiveCategory.css'

function getCategoryDescriptorFromName(name){
  if(name){
    return 'Viewing ' + name[0].toUpperCase() + name.substr(1) + ' Blog Posts.'
  }
  return ''
}

function categoryDefined(name, bgColor){
  return name && bgColor
}

function applyDefaultStyling(props){
  return {
    transition: 'all 0.25s ease-in-out',
    width: '100%',
    borderColor: props.bgColor,
    ...props.style
  }
}

function setHeightAndBorderWidthStyle(style, heightAndBorder = {height: '75%', borderBottomWidth: '2px'}){
  style.height = (heightAndBorder.height ? heightAndBorder.height : 0)
  style.borderBottomWidth = (heightAndBorder.borderBottomWidth ? heightAndBorder.borderBottomWidth : 0)
  return style
}

const ActiveCategory = (props) => {
  let name = getCategoryDescriptorFromName(props.name)
  let style = applyDefaultStyling(props)
  if(categoryDefined(props.name, props.bgColor)){
    setHeightAndBorderWidthStyle(style)
  }
  else{
    setHeightAndBorderWidthStyle(style, {borderBottomWidth: 0})
  }
  return (
    <div className='focused-div' style={style}>
      <div className='now-viewing' style={{color: props.bgColor}}>{name}</div>
    </div>
  )
}

export default ActiveCategory
