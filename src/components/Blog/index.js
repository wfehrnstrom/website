import React from 'react'
import PageTitle from '../PageTitle'
import Fade from '@material-ui/core/Fade'
import CategoryBar from '../CategoryBar'
import BlogCollection from './components/BlogCollection'
import viewAware from '../../containers/viewAware'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {OTHER, OTHER_COLOR} from '../../constants'
import SearchBar from 'material-ui-search-bar'
import {Link} from 'react-router-dom'
import Image from '../Image'
import wfsmall from '../../res/vector/wfsmall.svg'

class BlogViewUnaware extends React.Component {
  constructor(props){
    super(props)
    this.props.loadBlogs()
    this.state = {
      activeFilter: null,
    }
    this.applyFilter = this.applyFilter.bind(this)
  }

  renderSearchBar(){
    return (
      <SearchBar
        onChange={
          () => {
          console.log('change!')
          }}
        onRequestSearch={
          () => {
            console.log('Request Search')
          }
        }
        style={{
          margin: '25px 0'
        }}
      />)
  }

  applyFilter(filter){
    this.setState({activeFilter: filter})
  }

  filterBlogs(blogMap, filterSeed = null){
    if(!blogMap){
      return []
    }
    let passedBlogs = new Map([])
    let filter = filterSeed ? filterSeed : this.state.activeFilter
    if(!filter){
      return blogMap
    }
    blogMap.forEach(function(blogObj, blogTitle){
      if(blogObj.type === filter){
        passedBlogs.set(blogTitle, blogObj)
      }
    })
    return passedBlogs
  }

  renderBlogs(){
    let blogGroupToColorMap = new Map([['personal', '#4C98FF'], ['technical', '#FF5959'], [OTHER, OTHER_COLOR]])
    let blogs = this.filterBlogs(this.props.blogs)
    if(this.props.blogs){
      const BLOG_CLASS_NAME = 'blog-wrapper'
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <CategoryBar strict groups={blogGroupToColorMap} data={Array.from(this.props.blogs.values())} filter={'type'} onGroupSelect={this.applyFilter} style={{width: '70vw', height: '2rem', marginTop: '5vh'}}/>
          <BlogCollection colorMapping={blogGroupToColorMap} blogs={blogs} style={{width: '70%', margin: '20px auto'}} rowHeight={'50vh'}/>
        </div>
      )
    }
    else{
      return (
        <div style={{width: '100vw', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          There aren't any blogs in this neighborhood!  Stay tuned!
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
          <Link to='/home'>
            <Image src={wfsmall} alt={'w.f'} style={{backgroundColor: 'white', position: 'fixed', width: '3rem', height: '2rem', top: '5vh', right: '5vw', objectFit: 'contain'}}/>
          </Link>
          {this.renderBlogs()}
      </div>
    )
  }
}

const Blog = viewAware(BlogViewUnaware)

export default Blog
