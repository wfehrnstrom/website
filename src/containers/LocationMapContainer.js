import {connect} from 'react-redux'
import {setLocation} from '../actions/mapDataActions'
import LocationMap from '../components/Map'

const mapStateToProps = (state, ownProps) => {
  return {
    currentLocation: state.app.mdreducer.currentLocationNode,
    locations: ownProps.locations,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location) => {
      dispatch(setLocation(location))
    }
  }
}

const LocationMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationMap)

export default LocationMapContainer
