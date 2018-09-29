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
    this.state = {
      projects: [
        new Project(
          [{name: 'Will Fehrnstrom', img: profilePhoto}],
          'Drone Construction',
          null,
          STATUS["COMPLETED"],
          new Date(2016, 2, 14, 24, 0, 0, 0),
          new Date(2017, 4, 7, 24, 0, 0, 0),
          null,
          [uasPhoto],
          "&emsp;The idea to build a drone was a direct extension of my experimentation with \
          microcontrollers (arduino, STM32, Raspberry Pis) around that time.  Plus, as my \
          friend was working for 3DR at the time (when they were still making hardware), I had \
          easy access to fixer uppers.<br/><br/>&emsp;I originally intended to refurbish an octocopter with \
          several blown out motors, but my friend and I were stymied by almost system-wide failures. \
          We decided it would be a better idea to build a quadcopter from the materials we could \
          scrap off of the octocopter, as at least 4 of the motors were still functioning correctly, as \
          was the pixhawk.  We purchased vibration-damping gel to remove some of the vibrations from the \
          motors and also reduced EMI effects with copper plating.  The initial flight occurred in the \
          spring of 2017.",
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
          "&emsp;I began this project while staying on Cold Stream Pond in Maine. I've tried my \
          hand before at creating websites, but all of the previous attempts were decidedly \
          old school, primarily featuring a stack of HTML/CSS and vanilla JS, as well as a \
          dash of JQuery to animate things around.  Given that web technology has changed a \
          lot, I decided to give it another go.<br/><br/>&emsp;The website you are on right now is the direct \
          result of that attempt. I used Figma to mock up all my static designs for the website, \
          from my logo to entire pages. I use React.JS as a frontend framework primarily because \
          I like React's design philosophy and it tends to scale quite well, saving me a good \
          amount of work.  One thing I would love to revamp on this website is the way I currently \
          handle CSS. I work with plain old CSS to design everything to my specifications, but it \
          would perhaps be aided by using SCSS instead. I'm also using Redux to store a lot of my \
          application state, and firebase to remotely store some data.  I'm hosting the website through \
          netlify, enabling simple website deployments through the master branch of my git repository. \
          I use Google's Material Design Icons and Material UI to enable many of the icons and transitions \
          throughout this site.",
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
