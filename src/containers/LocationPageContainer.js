import LocationPage from '../components/LocationPage'
import {connect} from 'react-redux'
import {getLocations} from '../actions/mapDataActions'
import viewAware from '../containers/viewAware'

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
)(viewAware(LocationPage))

export default LocationPageContainer
