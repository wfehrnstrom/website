import React from 'react'
import NotFound from '../NotFound'
import Project from '../Projects/components/Project'
import '../../styles/ProjectList.css'

class ProjectList extends React.Component {
  constructor(props){
    super(props)
  }

  renderList(){
    if(this.props.projects && this.props.projects.length > 0){
      return this.props.projects.map(function(project, index){
        return (
          <Project imgs={project.imgs} title={project.title} type={project.type} createdOn={project.createdOn} index={index} authors={project.author} urls={project.urls}/>
        )
      })
    }
    return <div style={{width: '100%', height: '70vh'}}><NotFound/></div>
  }

  render(){
    return (
      <div className='project-list-container'>
        {this.renderList()}
      </div>
    )
  }
}

export default ProjectList
