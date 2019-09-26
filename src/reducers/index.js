import {combineReducers} from 'redux'
import MapDataReducer from './mapDataReducer'
import MediaDataReducer from './mediaDataReducer'
import BlogDataReducer from './blogDataReducer'
import projectreducer from './projectReducer'
import optionsReducer from './optionsReducer'

const appReducers = combineReducers({
  mdreducer: MapDataReducer,
  mediareducer: MediaDataReducer,
  blogreducer: BlogDataReducer,
  projectreducer: projectreducer,
  optionsreducer: optionsReducer,
})

export default appReducers
