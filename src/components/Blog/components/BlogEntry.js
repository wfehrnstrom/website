import React from 'react'
import Image from '../../Image'
import {composeImage, renderImage} from '../../../constants/helpers'
import withCoverTransition from '../../Transitions/withCoverTransition'
import withHover from '../../Transitions/withHover'
import withModal from '../../Transitions/withModal'
import '../../../styles/BlogEntry.css'

class BlogEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: this.getFormattedDate(props.date)
    }
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
        <div className='blog-date'>{this.state.date}</div>
        {renderImage(this.props.bannerImg, {width: '100%', height: '50vh'})}
        <div className='content'>{this.props.content}</div>
      </div>
    )
  }
}

export default BlogEntry
