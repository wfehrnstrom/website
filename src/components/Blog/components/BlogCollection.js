import React from 'react'
import BlogPortal from './BlogPortal'
import {Row, Col} from 'react-flexbox-grid'
import '../../../styles/BlogCollection.css'
import Fade from '@material-ui/core/Fade'

class BlogCollection extends React.Component {

  constructor(props){
    super(props)
  }

  getColorFromBlogType(type){
    return this.props.colorMapping.get(type)
  }

  renderBlog(){
    if(!this.props.blogs || this.props.blogs.length === 0){
      return (<div style={{color: 'black', fontSize: '2rem'}}>{'No Blogs. :('}</div>)
    }
    return this.props.blogs.map(function(blog){
      return (
        <Fade in={true} timeout={1000}>
          <Col xs={12} lg={6}>
              <BlogPortal color={this.getColorFromBlogType(blog.type)} blog={blog}/>
          </Col>
        </Fade>
      )
    }.bind(this))
  }

  render(){
    return (
      <div style={this.props.style}>
        <Row style={{height: this.props.rowHeight}}>
          {this.renderBlog()}
        </Row>
      </div>
    )
  }
}

export default BlogCollection
