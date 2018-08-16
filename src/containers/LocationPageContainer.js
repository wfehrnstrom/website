import LocationPage from '../components/LocationPage'
import {connect} from 'react-redux'
import {getLocations} from '../actions/mapDataActions'

const mapStateToProps = (state, ownProps) => {
  return {
    activeView: ownProps.activeView,
    currLocationNode: state.app.mdreducer.currentLocationNode,
    locationNodes: state.app.mdreducer.locationNodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLocations: () => {
      dispatch(getLocations())
    },
  }
}

const LocationPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPage)

export default LocationPageContainer
