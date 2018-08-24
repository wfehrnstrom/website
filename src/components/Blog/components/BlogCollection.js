import React from 'react'
import BlogPortal from './BlogPortal'
import BlogEntry from './BlogEntry'
import {Row, Col} from 'react-flexbox-grid'
import '../../../styles/BlogCollection.css'
import Fade from '@material-ui/core/Fade'
import {BLOG_FORMATS} from '../../../constants'

class BlogCollection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      format: BLOG_FORMATS["GRIDDED"],
      activeEntry: null,
    }
    this.expandEntries = this.expandEntries.bind(this)
  }

  expandEntries(activeEntry = null){
    this.setState({format: BLOG_FORMATS["SCROLLTHROUGH"], activeEntry: activeEntry})
  }

  getColorFromBlogType(type){
    return this.props.colorMapping.get(type)
  }

  renderGriddedBlog(){
    let gridEntries = Array.from(this.props.blogs.values()).map(function(blog){
      return (
        <Fade key={blog.title} in={true} timeout={1000}>
          <Col xs={12} lg={6}>
            <BlogPortal onClick={this.expandEntries.bind(this, blog)} color={this.getColorFromBlogType(blog.type)} blog={blog}/>
          </Col>
        </Fade>
      )
    }.bind(this))
    return (
      <Row style={{height: this.props.rowHeight}}>
        {gridEntries}
      </Row>
    )
  }

  renderExpandedBlog(){
    let blogsToDisplay = new Map(this.props.blogs)
    let {activeEntry} = this.state
    if(activeEntry && blogsToDisplay.get(activeEntry.title)){
      let blogs = [<BlogEntry title={activeEntry.title} date={activeEntry.date} content={activeEntry.content}/>]
      blogsToDisplay.delete(activeEntry.title)
      Array.from(blogsToDisplay.values()).forEach(function(blog){
        blogs.push(<BlogEntry title={blog.title} date={blog.date} content={blog.content}/>)
      })
      return blogs
    }
    else{
      return Array.from(this.props.blogs.values()).map(function(blog){
        return (
          <BlogEntry title={blog.title} date={blog.date} content={blog.content}/>
        )
      })
    }
  }

  renderBlog(){
    if(!this.props.blogs || this.props.blogs.length === 0){
      return (<div style={{color: 'black', fontSize: '2rem'}}>{'No Blogs. :('}</div>)
    }
    switch(this.state.format){
      case BLOG_FORMATS["SCROLLTHROUGH"]:
        return this.renderExpandedBlog()
      default:
        return this.renderGriddedBlog()
    }
  }

  render(){
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.renderBlog()}
      </div>
    )
  }
}

export default BlogCollection
