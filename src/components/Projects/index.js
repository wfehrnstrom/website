import React from 'react'
import {Project, ProjectFromJson} from '../../constants/Project'
import {STATUS, PROJECT_TYPES} from '../../constants'
import {toLinkString} from '../../constants/helpers'
import {Switch, Route} from 'react-router-dom'
import DefaultProjectPage from './components/DefaultProjectPage'
import ProjectsHome from './components/ProjectsHome'

import uasPhoto from '../../res/img/projects/uas.jpeg'
import mePhoto from '../../res/img/projects/me.jpeg'
import profilePhoto from '../../res/img/headshots/willfehrnstrom.png'

class Projects extends React.Component {
  constructor(props){
    super(props)
    this.props.loadProjects()
  }

  renderRoutes(){
    if(this.props.projects){
      return this.props.projects.map(function(project, index){
        return <Route key={`${this.props.match.path}/${toLinkString(project.title, '')}`} path={`${this.props.match.path}/${toLinkString(project.title, '')}}`} render={(props) => (<DefaultProjectPage project={project} {...props}/>)}/>
      }.bind(this))
    }
    return null
  }

  render(){
    return (
      <Switch>
        <Route key={`${this.props.match.path}/`} exact path={`${this.props.match.path}/`} render={(props) => (<ProjectsHome projects={this.props.projects} match={props.match}/>)}/>
        {this.renderRoutes()}
      </Switch>
    )
  }
}

export default Projects
