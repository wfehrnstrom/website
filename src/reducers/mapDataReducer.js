import * as mdaction from '../actions/mapDataActions'

function MapDataReducer(state = {currentLocationNode: null}, action){
   switch(action.type){
     case mdaction.SET_LOCATION:
        return {...state, currentLocationNode: action.location}
     case mdaction.POPULATE_LOCATIONS:
        return {...state, locationNodes: action.locations}
     default:
        return state
   }
 }

 export default MapDataReducer
