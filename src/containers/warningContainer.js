import {connect} from 'react-redux'
import {setPreferences} from '../actions/preferenceActions'
import WarningPage from '../components/WarningPage'

const mapDispatchToProps = (dispatch) => {
  return {
    setFlashing: (flashing) => {
      dispatch(setPreferences(flashing))
    }
  }
}

const WarningPageContainer = connect(
  null,
  mapDispatchToProps
)(WarningPage)

export default WarningPageContainer
