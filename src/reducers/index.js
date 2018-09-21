import {combineReducers} from 'redux'
import MapDataReducer from './mapDataReducer'
import MediaDataReducer from './mediaDataReducer'
import BlogDataReducer from './blogDataReducer'
import projectreducer from './projectReducer'

const appReducers = combineReducers({
  mdreducer: MapDataReducer,
  mediareducer: MediaDataReducer,
  blogreducer: BlogDataReducer,
  projectreducer: projectreducer,
})

export default appReducers
