import React from 'react'
import '../../../styles/AuthorWidget.css'
import {elementGetOffsetFromParent} from '../../../constants/helpers'

class AuthorWidget extends React.Component {
  constructor(props){
    super(props)
    this.widgetRef = React.createRef()
    this.state = {
      offsets: null
    }
  }

  componentDidMount(){
    this.setState({
      offsets: this.getOffsets()
    })
  }

  render(){
    return (
      <div className='odd-widget-authors' ref={this.widgetRef}>
        {this.renderAuthors()}
        {this.renderFocusedAuthor()}
      </div>
    )
  }

  renderAuthors(){
    if(!this.props || !this.props.authors){
      return null
    }
    return this.props.authors.map(function(author, index){
      return (
        <div className='author' style={{display: 'inline-block'}}>
          {(author && author.img) && <img className='author-img' src={author.img}/>}
        </div>
      )
    }.bind(this))
  }

  renderFocusedAuthor(){
    return null
  }
}

export default AuthorWidget
