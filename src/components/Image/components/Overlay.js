import React from 'react'

const Overlay = (props) => {
  let desc = <div key='desc' className='text desc'>{props.desc}</div>
  let date = <div key='date' className='text date'>{props.date && props.date.getFullYear()}</div>
  return (
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      {props.desc && props.date && [desc, date]}
    </div>
  )
}

export default Overlay
