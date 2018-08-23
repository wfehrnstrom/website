import {connect} from 'react-redux'
import Blog from '../components/Blog'
import * as blogActions from '../actions/blogDataActions'

const mapStateToProps = (state) => {
  return {
    blogs: state.app.blogreducer.blogs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBlogs: () => {
      dispatch(blogActions.loadBlogs())
    }
  }
}

const BlogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default BlogContainer
