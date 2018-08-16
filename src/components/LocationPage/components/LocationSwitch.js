import React from 'react'
import arrow from '../../../res/vector/arrow.svg'
import '../../../styles/LocationSwitch.css'


const LocationSwitch = (props) => {
  return (
    <div className = 'location-switch' style={props.style}>
      {props.hasNext &&
          (<div className = 'option next' onClick={props.nextLocation}>
            <div>Next</div>
            <div className = 'arrow'><img alt='arrow' src={arrow}/></div>
          </div>)
      }
      {props.hasPrev &&
        (
          <div className = 'option previous' onClick={props.prevLocation}>
            <div className = 'arrow'><img alt='back arrow' src={arrow}/></div>
            <div>Previous</div>
          </div>)
      }
    </div>
  )
}

export default LocationSwitch
