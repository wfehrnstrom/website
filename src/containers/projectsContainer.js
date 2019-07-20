import {loadProjects} from '../actions/projectActions'
import {connect} from 'react-redux'
import Projects from '../components/Projects'
import projectJSON from '../res/data/projects.json'
import me from '../res/img/headshots/willfehrnstrom.png'
import uasPhoto from '../res/img/projects/uas.jpeg'
import mePhoto from '../res/img/projects/me.jpeg'
import lidarPhoto from '../res/img/projects/lidar.png'
import memsPhoto from '../res/img/projects/mems.jpg'
import hoth from '../res/img/projects/HOTH_2018.jpg'
import rust from '../res/img/projects/rustgzip.png'

const mapStateToProps = (state) => {
  return {
    projects: state.app.projectreducer.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProjects: () => {
      dispatch(loadProjects(projectJSON,
      new Map([
        ['Drone Construction', {authors: [me], projectImages: [uasPhoto]}],
        ['Personal Website', {authors: [me], projectImages: [mePhoto]}],
        ['LIDAR Research', {authors: [me], projectImages: [lidarPhoto]}],
        ['MEMS Research', {authors: [me], projectImages: [memsPhoto]}],
        ['BruinMap', {authors: [me], projectImages: [hoth]}],
        ['rustgzip', {authors: [me], projectImages: [rust]}]
      ])))
    }
  }
}

const ProjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)

export default ProjectsContainer
