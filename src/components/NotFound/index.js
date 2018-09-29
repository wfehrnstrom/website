import React from 'react'
import '../../styles/NotFound.css'

const NotFound = (props) => {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '100%', ...props.style}}>
      <div className='element-not-found'>
        Hmmm. There doesn't appear to be anything here.
      </div>
    </div>
  )
}

export default NotFound
