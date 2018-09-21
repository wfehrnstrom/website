import React from 'react'
import PageTitle from '../PageTitle'
import ImageData from '../../constants/ImageData'
import Project from '../../constants/Project'
import {STATUS, PROJECT_TYPES} from '../../constants'
import PhotoGrid from '../PhotoGrid'
import ProjectList from '../ProjectList'
import Fade from '@material-ui/core/Fade'
import HomeLink from '../HomeLink'

import uasPhoto from '../../res/img/projects/uas.jpeg'
import lidarPhoto from '../../res/img/projects/lidar.png'
import mePhoto from '../../res/img/projects/me.jpeg'
import profilePhoto from '../../res/img/me_author.png'
import swarmLabPhoto from '../../res/img/projects/swarmlab.jpeg'
import teachLAPhoto from '../../res/img/projects/teachla_logo.png'

class Projects extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      projects: [
        new Project(
          [{name: 'Will Fehrnstrom', img: profilePhoto}],
          'Drone Construction',
          null,
          STATUS["COMPLETED"],
          new Date(Date.now()),
          null,
          null,
          [uasPhoto],
          PROJECT_TYPES["MECH"]
        ),
        new Project(
          [{name: 'Will Fehrnstrom', img: profilePhoto}],
          'Personal Website',
          'https://github.com/wfehrnstrom/website',
          STATUS["ACTIVE"],
          new Date(Date.now()),
          null,
          null,
          [mePhoto],
          PROJECT_TYPES["CS"],
          ['https://github.com/wfehrnstrom/website']
        )
      ]
    }
  }

  renderTitle(){
    return (
      <Fade in={true} timeout={400}>
        <PageTitle text={['projects', 'explore()']}/>
      </Fade>
    )
  }

  renderRoutes(){
    return null
  }

  renderProjects(){
    return <ProjectList projects={this.state.projects}/>
  }

  render(){
    return (
      <div className='page-root'>
        {this.renderTitle()}
        <HomeLink/>
        {this.renderProjects()}
        {this.renderRoutes()}
      </div>)
  }
}

export default Projects
