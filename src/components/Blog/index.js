import React from 'react'
import PageTitle from '../PageTitle'
import Fade from '@material-ui/core/Fade'
import CategoryBar from '../CategoryBar'
import BlogCollection from './components/BlogCollection'
import ToolBar from '../ToolBar'
import ToolBarItem from '../ToolBar/components/ToolBarItem'
import viewAware from '../../containers/viewAware'
import Collapse from '@material-ui/core/Collapse'
import FilterListIcon from '@material-ui/icons/FilterList'
import ReorderIcon from '@material-ui/icons/Reorder'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import ViewStreamIcon from '@material-ui/icons/ViewStream'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import {OTHER, OTHER_COLOR, BLOG_FORMATS, VIEWS} from '../../constants'
import SearchBar from 'material-ui-search-bar'
import Image from '../Image'
import HomeLink from '../HomeLink'
import '../../styles/Blog.css'

class BlogViewUnaware extends React.Component {
  constructor(props){
    super(props)
    this.props.loadBlogs()
    this.state = {
      activeFilter: null,
      filteringOn: null,
      blogFormat: BLOG_FORMATS["GRIDDED"],
      menuTooltipPlacement: 'left',
      toolbarVisible: true,
      showToolbarToggle: true,
    }
    this.applyFilter = this.applyFilter.bind(this)
    this.goToGridView = this.goToGridView.bind(this)
    this.goToStreamView = this.goToStreamView.bind(this)
    this.toggleToolbarVisibility = this.toggleToolbarVisibility.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.activeView !== this.props.activeView){
      this.setState({
        menuTooltipPlacement: this.getTooltipPlacement(nextProps.activeView),
        showToolbarToggle: this.shouldShowToolbarToggle(nextProps.activeView),
        toolbarVisible: true,
      })
    }
  }

  shouldShowToolbarToggle(viewSize){
    if(viewSize === VIEWS["DESKTOP"]){
      return true
    }
    else{
      return false
    }
  }

  getTooltipPlacement(viewSize){
    if(viewSize === VIEWS["DESKTOP"]){
      return 'left'
    }
    else{
      return 'bottom'
    }
  }

  getToolbarToggleClass(){
    if(this.state.toolbarVisible){
      return 'toolbar-showing'
    }
    else{
      return 'toolbar-hidden'
    }
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
    this.setState({activeFilter: filter, filteringOn: 'type'})
  }

  filterBlogs(blogMap, filterSeed = null){
    let filteredBlogs = new Map([])
    let filter = filterSeed ? filterSeed : this.state.activeFilter
    if(!blogMap){
      return new Map([])
    }
    if(!filter){
      return blogMap
    }
    blogMap.forEach(function(blogObj, blogTitle){
      if(blogObj.type === filter){
        filteredBlogs.set(blogTitle, blogObj)
      }
    })
    return filteredBlogs
  }

  hasBlogsToShow(blogs){
    return blogs && blogs.size > 0
  }

  renderBlogsIfFound(){
    if(this.hasBlogsToShow(this.props.blogs)){
      return this.renderBlogs(this.props.blogs)
    }
    return this.renderNoBlogMessage()
  }

  onBlogPortalClick(){
    this.setState({blogFormat: BLOG_FORMATS["SCROLLTHROUGH"]})
  }

  renderBlogs(blogs){
    let blogGroupToColorMap = new Map([['personal', '#4C98FF'], ['technical', '#FF5959'], [OTHER, OTHER_COLOR]])
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <CategoryBar id={'blog-type-bar'} strict filterThrough={'blogs'} filterOn={'type'} filter={this.state.activeFilter} groups={blogGroupToColorMap} data={Array.from(this.props.blogs.values())} filterGroupsWith={'type'} onGroupSelect={this.applyFilter} style={{height: '2rem', marginTop: '5vh'}}/>
        {this.renderToolBar()}
        <BlogCollection blogColorMap={blogGroupToColorMap} className='blog-collection' format={this.state.blogFormat} filterThrough={'blogs'} filterOn={'type'} filter={this.state.activeFilter} colorMapping={blogGroupToColorMap} blogs={blogs} onBlogPortalClick={this.onBlogPortalClick.bind(this)} style={{margin: '20px auto'}} rowHeight={'50vh'}/>
      </div>
    )
  }

  renderToolBar(){
    return (
      <ToolBar id='blog-toolbar'>
        {this.renderToolbarToggle()}
        {this.toolbarVisible() && this.renderToolBarContent()}
      </ToolBar>
    )
  }

  renderToolbarToggle(){
    if(this.state.showToolbarToggle){
      return this.renderToolBarIcon(KeyboardArrowDownIcon, this.getToolbarVisibilityTooltip(), {className: this.getToolbarToggleClass(), onClick: this.toggleToolbarVisibility})
    }
    else{
      return null
    }
  }

  toolbarVisible(){
    return this.state.toolbarVisible
  }

  renderToolBarContent(){
    return (
      <div className='toolbar-content'>
        {this.renderStreamOrGridIcon()}
        {this.renderToolBarIcon(ReorderIcon, 'Sort Posts')}
        {this.renderToolBarIcon(FilterListIcon, 'Filter Posts')}
      </div>
    )
  }

  getToolbarVisibilityTooltip(){
    return (this.state.toolbarVisible ? 'Hide Menu' : 'Show Menu')
  }

  toggleToolbarVisibility(){
    this.setState({toolbarVisible: !this.state.toolbarVisible})
  }

  renderStreamOrGridIcon(){
    if(this.state.blogFormat === BLOG_FORMATS['SCROLLTHROUGH']){
      return this.renderToolBarIcon(ViewModuleIcon, 'Blog Grid View', {onClick: this.goToGridView})
    }
    else{
      return this.renderToolBarIcon(ViewStreamIcon, 'Read Through Blogs', {onClick: this.goToStreamView})
    }
  }

  goToGridView(){
    if(this.state.blogFormat !== BLOG_FORMATS["GRIDDED"]){
      this.setState({blogFormat: BLOG_FORMATS["GRIDDED"]})
    }
  }

  goToStreamView(){
    if(this.state.blogFormat !== BLOG_FORMATS["SCROLLTHROUGH"]){
      this.setState({blogFormat: BLOG_FORMATS["SCROLLTHROUGH"]})
    }
  }

  renderToolBarIcon(Icon, helpLabel, props={}){
    let icon
    if(helpLabel){
      icon = this.renderIconWithLabel(Icon, helpLabel, props)
    }
    else{
      icon = this.renderIconWithoutLabel(Icon, props)
    }
    return icon
  }

  renderIconWithoutLabel(Icon, props){
    return (
      <IconButton {...props}>
        <Icon/>
      </IconButton>
    )
  }

  renderIconWithLabel(Icon, label, props){
    return (
      <Tooltip disableFocusListener enterDelay={300} leaveDelay={200} title={label} placement={this.state.menuTooltipPlacement}>
        <IconButton {...props}>
          <Icon/>
        </IconButton>
      </Tooltip>
    )
  }

  render(){
    return (
      <div className='page-root'>
          <Fade in={true} timeout={400}>
            <PageTitle className='page-title' text={['blog', 'read()']}/>
          </Fade>
          <HomeLink/>
          {this.renderBlogsIfFound()}
      </div>
    )
  }

  renderNoBlogMessage(){
    return (
      <div style={{width: '100vw', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        There aren't any blogs in this neighborhood!  Stay tuned!
      </div>
    )
  }
}

const Blog = viewAware(BlogViewUnaware)

export default Blog
