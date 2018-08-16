import React from 'react'
// IMPORT IMAGES
import us_map from '../../res/img/map/us_map.svg'
import LocationNodeContainer from './containers/LocationNodeContainer'

/**
 * Map
 * @extends React
 *  @prop activeView - the current layout type.  see VIEWS in constants
 */
class LocationMap extends React.Component{
  componentWillMount(){
    this.props.setLocation(this.props.locations[0])
  }

  populateMap(){
    return this.props.locations.map(function(location, i){
      return <LocationNodeContainer key={i} locationData={location}/>
    })
  }

  render(){
    return (
      <div style={{width: this.props.width, ...this.props.style}}>
        <img src={us_map} alt={"Map of the USA"}/>
        {this.populateMap()}
      </div>
    )
  }
}

export default LocationMap
