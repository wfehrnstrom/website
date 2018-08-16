import React from 'react'
import '../../styles/SectionTitle.css'

const SectionTitle = (props) => {
  return (
    <div className='section-title' style={props.style}>
      <div className='section-title-text' style={{color: '#000000', marginTop: 0, marginBottom: 0}}>{props.text[0]}</div>
      <div className='section-title-text' style={{color: '#FF5959', marginTop: 0}}>{props.text[1]}</div>
    </div>
  )
}

export default SectionTitle
