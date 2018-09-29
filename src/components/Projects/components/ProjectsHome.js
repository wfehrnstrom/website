import React from 'react'
import Fade from '@material-ui/core/Fade'
import PageTitle from '../../PageTitle'
import HomeLink from '../../HomeLink'
import ProjectList from '../../ProjectList'

const ProjectsHome = (props) => (
  <div className='page-root'>
    <Fade in={true} timeout={400}>
      <PageTitle text={['projects', 'explore()']}/>
    </Fade>
    <HomeLink/>
    <ProjectList match={props.match} projects={props.projects}/>
  </div>
)

export default ProjectsHome
