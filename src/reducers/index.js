import {combineReducers} from 'redux'
import MapDataReducer from './mapDataReducer'
import MediaDataReducer from './mediaDataReducer'
import BlogDataReducer from './blogDataReducer'

const appReducers = combineReducers({
  mdreducer: MapDataReducer,
  mediareducer: MediaDataReducer,
  blogreducer: BlogDataReducer,
})

export default appReducers
