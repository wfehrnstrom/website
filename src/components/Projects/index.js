import React from 'react'
import Project from '../../constants/Project'
import {STATUS, PROJECT_TYPES} from '../../constants'
import {toLinkString} from '../../constants/helpers'
import {Switch, Route} from 'react-router-dom'
import DefaultProjectPage from './components/DefaultProjectPage'
import ProjectsHome from './components/ProjectsHome'

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

  renderRoutes(){
    return this.state.projects.map(function(project, index){
      return <Route key={`${this.props.match.path}/${toLinkString(project.title, '')}`} path={`${this.props.match.path}/${toLinkString(project.title, '')}}`} render={(props) => (<DefaultProjectPage project={project} {...props}/>)}/>
    }.bind(this))
  }

  render(){
    return (
      <Switch>
        <Route key={`${this.props.match.path}/`} exact path={`${this.props.match.path}/`} render={(props) => (<ProjectsHome projects={this.state.projects} match={props.match}/>)}/>
        {this.renderRoutes()}
      </Switch>
    )
  }
}

export default Projects
