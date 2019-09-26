import { connect } from 'react-redux'
import Home from '../components/Home'

const mapStateToProps = (state) => {
  return {
    shouldFlash: state.app.optionsreducer.flashing
  }
}

const HomeContainer = connect(
  mapStateToProps,
  null
)(Home)

export default HomeContainer
