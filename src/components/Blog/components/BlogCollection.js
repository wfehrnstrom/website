import React from 'react'
import BlogPortal from './BlogPortal'
import BlogEntry from './BlogEntry'
import withFilter from './withFilter'
import {Row, Col} from 'react-flexbox-grid'
import '../../../styles/BlogCollection.css'
import Fade from '@material-ui/core/Fade'
import {BLOG_FORMATS} from '../../../constants'

class BlogCollection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      activeEntry: null,
    }
  }

  getColorFromBlogType(type){
    return this.props.colorMapping.get(type)
  }

  onBlogPortalClick(blog){
    this.setState({activeEntry: blog.title})
    if(this.props.onBlogPortalClick){
      this.props.onBlogPortalClick()
    }
  }

  blogsNotMapType(){
    return (!this.props.blogs || !(this.props.blogs instanceof Map))
  }

  renderGriddedBlog(){
    if(this.blogsNotMapType()){
      return null
    }
    let blogArr = this.getBlogArrFrom(this.props.blogs)
    let gridEntries = this.getBlogPortalsFrom(blogArr)
    return (
      <Row style={{height: this.props.rowHeight}}>
        {gridEntries}
      </Row>
    )
  }

  getBlogArrFrom(blogMap){
    return Array.from(blogMap.values())
  }

  getBlogPortalsFrom(blogArr){
    return blogArr.map(function(blog){
      return this.renderBlogPortal(blog)
    }.bind(this))
  }

  renderBlogPortal(blog){
    return (
      <Fade key={blog.title} in={true} timeout={1000}>
        <Col xs={12} lg={6}>
          <BlogPortal onClick={this.onBlogPortalClick.bind(this, blog)} color={this.getColorFromBlogType(blog.type)} blog={blog}/>
        </Col>
      </Fade>
    )
  }

  renderExpandedBlog(){
    let blogsToDisplay = new Map(this.props.blogs)
    let {activeEntry} = this.state
    if(this.anEntryIsFocused()){
      let blogs = [this.renderBlogEntry(activeEntry)]
      blogsToDisplay.delete(activeEntry.title)
      Array.from(blogsToDisplay.values()).forEach(function(blog){
        blogs.push(<BlogEntry key={blog.title} title={blog.title} date={blog.date} content={blog.content}/>)
      })
      return blogs
    }
    else{
      return Array.from(this.props.blogs.values()).map(function(blog){
        return (
          <BlogEntry key={blog.title} title={blog.title} date={blog.date} content={blog.content}/>
        )
      })
    }
  }

  anEntryIsFocused(){
    return this.blogExistsInMap(this.state.activeEntry, this.props.blogs)
  }

  blogExistsInMap(blog, blogMap){
    return (blog && blogMap.get(blog.title))
  }

  renderFocusedEntryThenOthers(){
    let blogsToDisplay = [this.renderBlogEntry(this.state.activeEntry)]
    let blogsToSelectFrom = new Map(this.props.blogs)
    blogsToSelectFrom = this.deselectFocusedBlog(blogsToSelectFrom)
    let blogArr = this.getBlogArrFrom(blogsToSelectFrom)
    blogArr.forEach(function(blog){
      blogsToDisplay.push(this.renderBlogEntry(blog))
    })
  }

  deselectFocusedBlog(blogsToSelectFrom){
    let key = this.state.activeEntry.title
    return blogsToSelectFrom.delete(key)
  }

  renderBlogEntry(blog){
    return (<BlogEntry key={blog.title} title={blog.title} date={blog.date} content={blog.content}/>)
  }

  renderBlog(){
    if(!this.props.blogs || this.props.blogs.length === 0){
      return (<div style={{color: 'black', fontSize: '2rem'}}>{'No Blogs. :('}</div>)
    }
    switch(this.props.format){
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

export default withFilter(BlogCollection)
