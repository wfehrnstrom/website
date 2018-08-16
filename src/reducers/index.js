import {combineReducers} from 'redux'
import MapDataReducer from './mapDataReducer'

const appReducers = combineReducers({
  mdreducer: MapDataReducer,
})

export default appReducers
