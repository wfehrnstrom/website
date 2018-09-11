import React from 'react'
import PageTitle from '../PageTitle'
import Fade from '@material-ui/core/Fade'
import CategoryBar from '../CategoryBar'
import withOrdering from './components/withOrdering'
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
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {OTHER, OTHER_COLOR, BLOG_FORMATS, VIEWS} from '../../constants'
import SearchBar from 'material-ui-search-bar'
import Image from '../Image'
import HomeLink from '../HomeLink'
import '../../styles/Blog.css'

const COMPARISONS = Object.freeze({"AUTHOR": 1, "DATE": 2, "TITLE": 3,})

const OrderedCategoryBar = withOrdering(CategoryBar)

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
      sortMenuAnchor: null,
      filterMenuAnchor: null,
      comparisonType: COMPARISONS["DATE"],
    }
    this.applyFilter = this.applyFilter.bind(this)
    this.goToGridView = this.goToGridView.bind(this)
    this.goToStreamView = this.goToStreamView.bind(this)
    this.toggleToolbarVisibility = this.toggleToolbarVisibility.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.compareByAuthor = this.compareByAuthor.bind(this)
    this.compareByTitle = this.compareByTitle.bind(this)
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

  getComparison(){
    return this.getComparisonFromSortingType(this.state.comparisonType)
  }

  getComparisonFromSortingType(comparisonType){
    switch(comparisonType){
      case COMPARISONS["AUTHOR"]:
        return this.compareByAuthor
      case COMPARISONS["TITLE"]:
        return this.compareByTitle
      case COMPARISONS["DATE"]:
      default:
        return this.compareByDate
    }
  }

  setSortingType(comparisonType){
    this.setState({comparisonType})
  }

  compareByDate(blog1, blog2){
    if(blog1.date.getTime() > blog2.date.getTime()){
      return -1
    }
    else if(blog1.date.getTime() < blog2.date.getTime()){
      return 1
    }
    return 0
  }

  compareByAuthor(blog1, blog2){
    if(this.noAuthors(blog1, blog2)){
      return 0
    }
    let [author1, author2] = [blog1.author.toLowerCase(), blog2.author.toLowerCase()]
    let priorityResult = this.prioritizeAuthor(author1, author2)
    if(priorityResult){
      return priorityResult
    }
    else{
      return this.compareStrings(blog1.author, blog2.author)
    }
  }

  noAuthors(blog1, blog2){
    return !blog1.author || !blog2.author
  }

  prioritizeAuthor(author1, author2, priorityAuthor = "will fehrnstrom"){
    if(author1 === priorityAuthor && author2 !== priorityAuthor){
      return -1
    }
    else if(author2 === priorityAuthor && author1 !== priorityAuthor){
      return 1
    }
    return 0
  }

  compareByTitle(blog1, blog2){
    let [title1, title2] = [blog1.title.toLowerCase(), blog2.title.toLowerCase()]
    return this.compareStrings(title1, title2)
  }

  compareStrings(string1, string2){
    if(string1 < string2){
      return -1
    }
    else if(string1 > string2){
      return 1
    }
    return 0
  }

  renderBlogs(blogs){
    let blogGroupToColorMap = new Map([['personal', '#4C98FF'], ['technical', '#FF5959'], [OTHER, OTHER_COLOR]])
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {this.renderToolBar()}
        <OrderedCategoryBar id={'blog-type-bar'} groups={blogGroupToColorMap} data={Array.from(this.props.blogs.values())} sortThrough={'data'} filterGroupsWith={'type'}
          cmpFunc={this.getComparison()} onGroupSelect={this.applyFilter} 
          style={{width: '70%', height: '2rem', margin: '3vh auto 5vh auto'}}/>
        <BlogCollection blogColorMap={blogGroupToColorMap} className='blog-collection' format={this.state.blogFormat} applyFilter={this.applyFilter} filterThrough={'blogs'}
          filterOn={'type'} filter={this.state.activeFilter} colorMapping={blogGroupToColorMap} blogs={blogs} onBlogPortalClick={this.onBlogPortalClick.bind(this)}
          sortThrough={'blogs'} cmpFunc={this.getComparison()} style={{margin: '0 auto 20px auto'}} rowHeight={'50vh'}/>
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
        {this.renderIconMenu(
          ReorderIcon,
          'Sort Posts',
            {
              anchor: 'sortMenuAnchor',
              items: [<MenuItem onClick={this.setSortingType.bind(this, COMPARISONS["AUTHOR"])}>By Author</MenuItem>,
                      <MenuItem onClick={this.setSortingType.bind(this, COMPARISONS["DATE"])}>By Date</MenuItem>,
                      <MenuItem onClick={this.setSortingType.bind(this, COMPARISONS["TITLE"])}>By Title</MenuItem>,
                      <MenuItem>By Length</MenuItem>
                    ]
            },
          )
        }
        {this.renderIconMenu(
          FilterListIcon,
          'Sort Posts',
            {
              anchor: 'filterMenuAnchor',
              items: [<MenuItem>By Author</MenuItem>, <MenuItem>By Date</MenuItem>]
            },
         )
        }
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

  renderIconMenu(Icon, label, props){
    function onIconClick(event){
      this.toggleMenu.bind(this, event, props.anchor)()
    }

    return (
      <div>
        { this.renderToolBarIcon(Icon, label, {...props, onClick: onIconClick.bind(this) })}
        <Menu
          anchorEl={this.state[props.anchor]}
          open={Boolean(this.state[props.anchor])}
          onClose={onIconClick.bind(this)}
        >
          {props.items}
        </Menu>
      </div>
    )
  }

  renderFilterMenu(){
    return (
      <div>

      </div>
    )
  }

  toggleMenu(event, anchor){
    let target = event.currentTarget
    if(!this.state[anchor]){
      this.setState({[anchor]: target})
    }
    else {
      this.closeMenu(anchor)
    }
  }

  closeMenu(anchor){
    this.setState({[anchor]: null})
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
