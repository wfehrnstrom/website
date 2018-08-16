import {connect} from 'react-redux'
import * as mdactions from '../../../actions/mapDataActions'
import LocationSwitch from '../components/LocationSwitch'

const mapStateToProps = (state) => {
  return {
    hasNext: !!(state.app.mdreducer.currentLocationNode && state.app.mdreducer.currentLocationNode.next),
    hasPrev: !!(state.app.mdreducer.currentLocationNode && state.app.mdreducer.currentLocationNode.prev),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    nextLocation: () => {
      dispatch(mdactions.nextLocation())
    },
    prevLocation: () => {
      dispatch(mdactions.prevLocation())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSwitch)
