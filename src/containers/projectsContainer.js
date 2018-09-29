import {loadProjects} from '../actions/projectActions'
import {connect} from 'react-redux'
import Projects from '../components/Projects'
import projectJSON from '../res/data/projects.json'
import me from '../res/img/headshots/willfehrnstrom.png'
import uasPhoto from '../res/img/projects/uas.jpeg'
import mePhoto from '../res/img/projects/me.jpeg'

const mapStateToProps = (state) => {
  return {
    projects: state.app.projectreducer.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProjects: () => {
      dispatch(loadProjects(projectJSON, new Map([['Drone Construction', {authors: [me], projectImages: [uasPhoto]}], ['Personal Website', {authors: [me], projectImages: [mePhoto]}]])))
    }
  }
}

const ProjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)

export default ProjectsContainer
