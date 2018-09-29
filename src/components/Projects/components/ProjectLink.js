import React from 'react'
import {PROJECT_TYPES} from '../../../constants'
import {Link} from 'react-router-dom'
import {toLinkString} from '../../../constants/helpers'
import '../../../styles/Project.css'
import '../../../styles/AuthorWidget.css'
import memoize from 'memoize-one'


class ProjectLink extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      miniViewIndex: 0,
      // miniViews: this.constructMiniViews(),
      focused: false,
    }
    this.onHover = this.onHover.bind(this)
    this.onUnhover = this.onUnhover.bind(this)
  }

  componentWillUnmount(){
    clearInterval(this.intervalCallback)
  }

  projectHas(key){
    return (this.props.project && this.props.project[key] !== undefined && this.props.project[key] !== null)
  }

  constructMiniViews(){
    let callableMiniViews = []
    if(this.projectHas('createdOn')){
      callableMiniViews.push(this.renderProjectDates)
    }
    if(this.projectHas('author')){
      callableMiniViews.push(this.renderAuthors)
    }
    return callableMiniViews
  }

  onHover(){
    this.setState({focused: true})
    this.intervalCallback = setInterval(this.incrementMiniView.bind(this), 400)
  }

  onUnhover(){
    this.setState({focused: false})
    clearInterval(this.intervalCallback)
  }

  callMiniView(){
    let f = (this.state.miniViews[this.state.miniViewIndex]).bind(this)
    f()
  }

  incrementMiniView(){
    this.setState({miniViewIndex: this.state.miniViewIndex + 1})
  }

  renderProjectDates(){
    let oddOrEven = this.getOddOrEvenClass('odd', 'even')
    let labelPosition = this.getLabelPosition()
    return (
      <div className='date-widget-container' style={this.state.focused ? {height: '100%', width: '20vw'} : {width: '20vw'}}>
        <div className='project-short-title-label' style={this.state.focused ? {opacity: 1, ...labelPosition} : {opacity: 0, ...labelPosition}}>Dates</div>
        <div className={`project-title-widget-dates ${oddOrEven}-widget-dates`}>
          <div className={`negative-space left-title-widget-dates-${oddOrEven}`}></div>
          <div className={`negative-space right-title-widget-dates-${oddOrEven}`}></div>
          <p style={{margin: 0, marginBlockStart: 0, marginBlockEnd: 0, display: 'inline'}}>
            <span><strong>from </strong>{this.projectHas('createdOn') && this.props.project.createdOn.toDateString()}<br/></span>
            {this.mapFinishDateToText()}
          </p>
        </div>
      </div>
    )
  }

  mapFinishDateToText(){
    if(!this.projectHas('finishedOn')){
      return (<span><strong>to </strong> now</span>)
    }
    return (<span><strong>to </strong> {this.props.project.finishedOn.toString()}</span>)
  }

  renderAuthors(){
    let oddOrEven = this.getOddOrEvenClass('odd-widget-authors', 'even-widget-authors')
    let oddOrEvenMargin = this.getOddOrEvenClass('odd', 'even')
    let labelPosition = this.getLabelPosition()
    return (
      <div className='author-widget-container' style={this.state.focused ? {height: '100%', width: '20vw'} : {width: '20vw'}}>
        <div className='project-short-title-label' style={this.state.focused ? {opacity: 1, ...labelPosition} : {opacity: 0, ...labelPosition}}>Authors</div>
        <div className={`project-title-widget-authors ${oddOrEven}`}>
          <div className={`negative-space left-title-widget-authors-${oddOrEvenMargin}`}></div>
          <div className={`negative-space right-title-widget-authors-${oddOrEvenMargin}`}></div>
          {this.renderAuthorImages(this.props.project.author)}
        </div>
      </div>
    )
  }

  renderAuthorImages(authors){
    if(!authors){
      return null
    }
    return authors.map(function(author){
      return (
        <div key={author.name} className='author' style={{display: 'inline-block'}}>
          {(author && author.img) && <img className='author-img' src={author.img} alt={'Author headshot'}/>}
        </div>
      )
    })
  }

  hasOddIndex(){
    if(this.props && this.props.index !== undefined){
      return !(this.props.index % 2)
    }
    return false
  }

  renderCommitCount(){
    if(this.props.project.type !== PROJECT_TYPES["CS"]){
      return null
    }
    return null
  }

  renderBuildStatus(){
    if(this.props.project.type !== PROJECT_TYPES["CS"]){
      return null
    }
    return null
  }

  renderTitle(){
    let oddOrEven = this.getOddOrEvenClass('odd', 'even')
    let labelPosition = this.getLabelPosition()
    return (
      <div>
        <div className='project-short-title-label' style={this.state.focused ? {opacity: 1, ...labelPosition} : {opacity: 0, ...labelPosition}}>Title</div>
        <div className={`project-short-title ${oddOrEven}`} style={this.state.focused ? {opacity: 1} : {opacity: 0}}>
          <div className={`negative-space left-title-${oddOrEven}`}></div>
          <div className={`negative-space right-title-${oddOrEven}`}></div>
          <div className='short-title-text'>{this.props.project.title}</div>
        </div>
      </div>
    )
  }

  getOddOrEvenClass(oddClass, evenClass){
    if(this.props && this.props.index !== undefined){
      return (this.props.index % 2) ? evenClass : oddClass
    }
    return evenClass
  }

  getLabelPosition(offset = 0){
    return memoize((width) => {
      if(this.hasOddIndex()){
        let oddIndexedItemOffset = .08 * width
        return {top: '-30px', left: `${offset + oddIndexedItemOffset}px`}
      }
      return {top: '-30px'}
    })(window.innerWidth)
  }

  render(){
    if(!this.projectHas('title')){
      throw new Error("Project must be given a title!")
    }
    if(this.props.link){
      return this.renderWithComponentLink()
    }
    else if(this.props.urls && this.props.urls.length > 0){
      return this.renderWithURLLink()
    }
    else{
      return this.renderWithoutLink()
    }
  }

  renderWithComponentLink(link = this.props.link){
    return (
      <Link className='project-entry' to={`${this.props.match.url}/${toLinkString(this.props.project.title, '')}}`} onMouseEnter={this.onHover} onMouseLeave={this.onUnhover}>
        <img className='project-banner-img' src={this.props.imgs[0]} alt={'Project Background'}/>
        {this.renderTitle()}
        {this.projectHas('author') && this.renderAuthors()}
        {this.projectHas('createdOn') && this.renderProjectDates()}
      </Link>
    )
  }

  renderWithURLLink(){
    return (
      <a className='project-entry' onMouseEnter={this.onHover} onMouseLeave={this.onUnhover} href={this.props.urls[0]}>
        <img className='project-banner-img' src={this.props.imgs[0]} alt={'Project Background'}/>
        {this.renderTitle()}
        {this.projectHas('author') && this.renderAuthors()}
        {this.projectHas('createdOn') && this.renderProjectDates()}
      </a>
    )
  }

  renderWithoutLink(){
    return (
      <div className='project-entry'>
        <img className='project-banner-img' src={this.props.imgs[0]} alt={'Project Background'}/>
        {this.renderTitle()}
        {this.projectHas('author') && this.renderAuthors()}
        {this.projectHas('createdOn') && this.renderProjectDates()}
      </div>
    )
  }
}

export default ProjectLink
