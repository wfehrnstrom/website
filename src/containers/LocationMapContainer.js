import {connect} from 'react-redux'
import {setLocation} from '../actions/mapDataActions'
import LocationMap from '../components/Map'
import viewAware from './viewAware'

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
)(viewAware(LocationMap))

export default LocationMapContainer
