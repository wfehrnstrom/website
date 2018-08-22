import {combineReducers} from 'redux'
import MapDataReducer from './mapDataReducer'
import MediaDataReducer from './mediaDataReducer'

const appReducers = combineReducers({
  mdreducer: MapDataReducer,
  mediareducer: MediaDataReducer,
})

export default appReducers
