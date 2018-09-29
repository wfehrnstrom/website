import * as projectActions from '../actions/projectActions'

const projectreducer = (state = {
  projects: null
}, action) => {
  switch(action.type){
    case projectActions.LOAD_PROJECTS:
      return {projects: action.projects, ...state}
    default:
      return state
  }
}

export default projectreducer
