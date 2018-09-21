import React from 'react'
import PageTitle from '../PageTitle'
import Project from '../../constants/Project'
import {STATUS, PROJECT_TYPES} from '../../constants'
import ProjectList from '../ProjectList'
import Fade from '@material-ui/core/Fade'
import HomeLink from '../HomeLink'

import uasPhoto from '../../res/img/projects/uas.jpeg'
import mePhoto from '../../res/img/projects/me.jpeg'
import profilePhoto from '../../res/img/me_author.png'

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
          new Date(2016, 2, 14, 24, 0, 0, 0),
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
          new Date(2018, 6, 0, 24, 0, 0, 0),
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
