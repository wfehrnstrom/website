import React from 'react'
import NotFound from '../NotFound'
import ProjectLink from '../Projects/components/ProjectLink'
import {toLinkString} from '../../constants/helpers'
import '../../styles/ProjectList.css'

class ProjectList extends React.Component {
  renderList(){
    let {match} = this.props
    return this.props.projects.map(function(project, index){
      return (
        <ProjectLink
          key={toLinkString(project.title, '-')}
          link={toLinkString(project.title, '-')}
          imgs={project.imgs}
          project={project}
          index={index}
          urls={project.urls}
          match={match}
        />
      )
    })
  }

  render(){
    if(this.props.projects){
      return (
        <div>
          <div className='project-list-container'>
            {this.renderList()}
          </div>
        </div>
      )
    }
    return <NotFound style={{width: '70vw', height: '70vh', marginLeft: '15vw'}}/>
  }
}

export default ProjectList
