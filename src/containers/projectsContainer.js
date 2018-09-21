import {loadProjects} from '../actions/projectActions'
import {connect} from 'react-redux'
import Projects from '../components/Projects'
import projectreducer from '../reducers/projectReducer'

const mapStateToProps = (state) => {
  return {
    projects: state.app.projectreducer.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProjects: () => {
      dispatch(loadProjects())
    }
  }
}

const ProjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)

export default ProjectsContainer
