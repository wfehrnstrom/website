import React from 'react'
import '../../../styles/LocationNode.css'

const LocationNode = (props) => {
  return (
    <div className='location-node' onClick={props.clickHandler} style={props.active ? {backgroundColor: '#FF5959', left: props.position[0], top: props.position[1]} : {backgroundColor: '#000000', left: props.position[0], top: props.position[1]}}>
    </div>
  )
}

export default LocationNode
