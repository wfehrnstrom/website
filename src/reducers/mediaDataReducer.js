import * as mediaActions from '../actions/mediaDataActions'

function mediaDataReducer(state={media: null}, action){
  switch(action.type){
    case mediaActions.LOAD_PHOTOS_FROM_DATA:
      return {...state, media: action.images}
    default:
      return state
  }
}

export default mediaDataReducer
