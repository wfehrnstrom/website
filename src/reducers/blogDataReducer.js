import * as blogActions from '../actions/blogDataActions'

function BlogDataReducer(state = {blogs: null}, action){
  switch(action.type){
    case blogActions.LOAD_BLOGS:
      let newState = {...state, blogs: action.blogs}
      return newState
    default:
      return state
  }
}

export default BlogDataReducer
