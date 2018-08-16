import { connect } from 'react-redux'
import LocationLookup from '../components/LocationLookup'

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.app.mdreducer.currentLocationNode,
    style: ownProps.style,
  }
}

const LocationLookupContainer = connect(
  mapStateToProps,
  null
)(LocationLookup)

export default LocationLookupContainer
