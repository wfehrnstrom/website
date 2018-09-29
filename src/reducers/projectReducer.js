import * as projectActions from '../actions/projectActions'

const projectreducer = (state = {
  projects: null
}, action) => {
  switch(action.type){
    case projectActions.LOAD_PROJECTS:
      let projects = {projects: action.projects}
      return Object.assign(state, projects)
    default:
      return state
  }
}

export default projectreducer
