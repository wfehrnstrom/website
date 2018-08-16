import { connect } from 'react-redux'
import { setLocation } from '../../../actions/mapDataActions'
import LocationNode from '../components/LocationNode'

const mapStateToProps = (state, ownProps) => {
  return {
    locationData: ownProps.locationData,
    position: ownProps.locationData.node.position,
    active: (state.app.mdreducer.currentLocationNode === ownProps.locationData)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickHandler: () => {
      dispatch(setLocation(ownProps.locationData))
    }
  }
}

const LocationNodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationNode)

export default LocationNodeContainer
