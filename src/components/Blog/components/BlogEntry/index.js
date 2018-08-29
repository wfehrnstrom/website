import React from 'react'
import Image from '../../../Image'
import Banner from './components/Banner'
import {renderImageFromSrcPath} from '../../../../constants/helpers'
import ImageData from '../../../../constants/ImageData'
import withCoverTransition from '../../../Transitions/withCoverTransition'
import withHover from '../../../Transitions/withHover'
import withModal from '../../../Transitions/withModal'
import withLazyLoad from '../../../Transitions/withLazyLoad'
import '../../../../styles/BlogEntry.css'

const LazyLoadingBanner = withLazyLoad(Banner)

class BlogEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: this.getFormattedDate(props.date),
      images: [renderImageFromSrcPath(this.props.bannerImg, {width: '100%', height: '50vh'})],
      minimized: false,
    }
    this.toggleMinimize = this.toggleMinimize.bind(this)
  }

  hasImages(){
    return this.state.images && this.state.images.length > 0
  }

  getFormattedDate(date){
    if(date instanceof Date){
      let dateString = date.toString()
      let lastIndexOfParen = dateString.lastIndexOf('(')
      dateString = dateString.substr(0, dateString.lastIndexOf(' ', lastIndexOfParen - 2))
      let components = dateString.split(' ')
      components.splice(0, 1)
      let formattedDate = ''
      formattedDate += components.pop() + ' ' + components.splice(0, 1)[0] + '. ' + components.splice(0, 1)[0] + ', ' + components.pop()
      return formattedDate
    }
    return null
  }

  render(){
    return (
      <div className='blog-entry'>
        <div className='title'>{this.props.title}</div>
        <LazyLoadingBanner onClick={this.toggleMinimize} style={{margin: 0, width: '100%', height: '1rem'}} color={this.props.bannerColor}/>
        {this.renderBlogContent()}
      </div>
    )
  }

  toggleMinimize(){
    this.setState({minimized: !this.state.minimized})
  }

  renderBlogContent(){
    if(!this.state.minimized){
      return (
        <div className='blog-content' style={{width: '100%'}}>
          {this.renderHeader()}
          {this.hasImages() && this.renderBannerImage()}
          <div className='writing'>{this.props.content}</div>
        </div>
      )
    }
    return null
  }

  renderHeader(){
    return (
      <div className='blog-header'>
        <div className='blog-author'>{this.props.author},</div>
        <div className='blog-date'>{this.state.date}</div>
      </div>
    )
  }

  renderBannerImage(){
    return this.state.images[0]
  }
}

export default BlogEntry
