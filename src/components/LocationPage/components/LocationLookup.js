import React from 'react'
import '../../../styles/LocationLookup.css'
import Fade from '@material-ui/core/Fade'
import {FADE_IN_TIMEOUT} from '../../../constants'

const LocationLookup = (props) => {
  if(props.location){
    return (
      <Fade in={true} timeout={1250}>
        <div className='location-lookup' style={props.style}>
          <div className = 'header'>
            <div className='circle'></div>
            <div className='location'>{props.location.node.name}</div>
          </div>
          <div className = 'content'>
            <div className='date'>{`${props.location.node.desc}, ${props.location.node.yearString}`}</div>
            <div className='coords'>{props.location.node.coords}</div>
          </div>
        </div>
      </Fade>
    )
  }
  else{
    return (
      <div className='location-lookup' style={props.style}>
        <div className='error-message'>{'Nothing to see here. :('}</div>
      </div>
    )
  }
}

export default LocationLookup
