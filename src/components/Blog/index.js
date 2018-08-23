import React from 'react'
import PageTitle from '../PageTitle'
import Fade from '@material-ui/core/Fade'
import CategoryBar from '../CategoryBar'
import viewAware from '../../containers/viewAware'

class BlogViewUnaware extends React.Component {
  constructor(props){
    super(props)
    this.props.loadBlogs()
  }

  renderBlogs(){
    let blogGroupToColorMap = new Map([['personal', '#4C98FF'], ['technical', '#FF5959']])
    if(this.props.blogs){
      return (
        <div>
          <CategoryBar strict groups={blogGroupToColorMap} data={Array.from(this.props.blogs.values())} filter={'type'} style={{width: '70vw', height: '2rem', marginTop: '5vh'}}/>
        </div>
      )
    }
    else{
      return (
        <div style={{width: '100vw', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          There doesn't seem to be anything here.
        </div>
      )
    }
  }

  render(){
    return (
      <div className='page-root'>
          <Fade in={true} timeout={400}>
            <PageTitle text={['blog', 'read()']} style={{marginLeft: '15vw', paddingTop: '4vh'}}/>
          </Fade>
          {this.renderBlogs()}
      </div>
    )
  }
}

const Blog = viewAware(BlogViewUnaware)

export default Blog
