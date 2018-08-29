import React from 'react'
import BlogPortal from './BlogPortal'
import BlogEntry from './BlogEntry'
import withFilter from './withFilter'
import withLazyLoad from '../../Transitions/withLazyLoad'
import {Row, Col} from 'react-flexbox-grid'
import '../../../styles/BlogCollection.css'
import Fade from '@material-ui/core/Fade'
import {BLOG_FORMATS} from '../../../constants'

const LazyLoadingBlogPortal = withLazyLoad(BlogPortal)

class BlogCollection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      activeEntry: null,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.format !== this.props.format){
      this.goToPageTop()
    }
  }

  goToPageTop(){
    window.scrollTo(0, 0)
  }

  getColorFromBlogType(type){
    return this.props.colorMapping.get(type)
  }

  onBlogPortalClick(blog){
    this.setState({activeEntry: blog})
    if(this.props.onBlogPortalClick){
      this.props.onBlogPortalClick()
    }
  }

  blogsNotMapType(){
    return (!this.props || !this.props.blogs || !(this.props.blogs instanceof Map))
  }

  renderGriddedBlog(){
    if(this.blogsNotMapType()){
      return null
    }
    let blogArr = this.getBlogArrFrom(this.props.blogs)
    return (
      <Row style={{height: this.props.rowHeight}}>
        {this.getBlogPortalsFrom(blogArr)}
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
      <Col xs={12} lg={6}>
        <LazyLoadingBlogPortal fade onClick={this.onBlogPortalClick.bind(this, blog)} color={this.getColorFromBlogType(blog.type)} blog={blog}/>
      </Col>
    )
  }

  renderExpandedBlog(){
    let blogsToDisplay = new Map(this.props.blogs)
    let {activeEntry} = this.state
    if(this.anEntryIsFocused()){
      return this.renderFocusedEntryThenOthers()
    }
    else{
      return this.renderAllBlogEntries()
    }
  }

  anEntryIsFocused(){
    return this.blogExistsInMap(this.state.activeEntry, this.props.blogs)
  }

  blogExistsInMap(blog, blogMap){
    return (blog && blogMap.get(blog.title))
  }

  renderFocusedEntryThenOthers(){
    let blogsToSelectFrom = new Map(this.props.blogs)
    blogsToSelectFrom = this.deselectFocusedBlog(blogsToSelectFrom)
    let blogArr = this.getBlogArrFrom(blogsToSelectFrom)
    return [this.renderBlogEntry(this.state.activeEntry), ...this.renderBlogEntries(blogArr)]
  }

  deselectFocusedBlog(blogsToSelectFrom){
    let key = this.state.activeEntry.title
    blogsToSelectFrom.delete(key)
    return blogsToSelectFrom
  }

  renderAllBlogEntries(){
    return this.renderBlogEntriesFromMap(this.props.blogs)
  }

  renderBlogEntriesFromMap(blogMap){
    let blogArr = this.getBlogArrFrom(blogMap)
    return this.renderBlogEntries(blogArr)
  }

  renderBlogEntries(blogArr){
    return blogArr.map(function(blog){
      return this.renderBlogEntry(blog)
    }.bind(this))
  }

  renderBlogEntry(blog){
    return (<BlogEntry key={blog.title} bannerColor={this.props.blogColorMap.get(blog.type)} bannerImg={blog.backgroundImg} author={blog.author} title={blog.title} date={blog.date} content={blog.content}/>)
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
