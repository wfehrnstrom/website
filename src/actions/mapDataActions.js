import firebase from 'firebase'
import Location from '../constants/Location'
import LocationDataNode from '../constants/LocationDataNode'
import {STORAGE_LOCATION_PREFIX} from '../constants'
import ImageData from '../constants/ImageData'

export const SET_LOCATION = 'SET_LOCATION'
export function setLocation(location){
  if(location){
    return {type: SET_LOCATION, location: location}
  }
  return null
}

export const POPULATE_LOCATIONS = 'POPULATE_LOCATIONS'
export function populateLocations(locations){
  return {type: POPULATE_LOCATIONS, locations: locations}
}

export function nextLocation(){
  return (dispatch, getState) => {
    let currLocation = getState().app.mdreducer.currentLocationNode
    let nextLocation
    if(currLocation){
      nextLocation = currLocation.next
    }
    if(nextLocation){
      dispatch(setLocation(nextLocation))
    }
  }
}

export function prevLocation(){
  return (dispatch, getState) => {
    let currLocation = getState().app.mdreducer.currentLocationNode
    let prevLocation
    if(currLocation){
      prevLocation = currLocation.prev
    }
    if(prevLocation){
      dispatch(setLocation(prevLocation))
    }
  }
}

function linkNodes(nodes){
  if(nodes){
    nodes[0].next = nodes[1]
    for(let i = 1; i < nodes.length - 1; i++){
      nodes[i].prev = nodes[i - 1]
      nodes[i].next = nodes[i + 1]
    }
    nodes[nodes.length - 1].prev = nodes[nodes.length - 2]
    return nodes
  }
  return null
}

export function getLocations(){
  return (dispatch) => {
    let firestore = firebase.firestore()
    let locations = firestore.collection('locations')
    let locationNodes = []
    let query = locations.get()
    query.then(function(querySnap){
      querySnap.forEach(function(docSnap){
        let promise = new Promise(function(resolve, reject){
          let locationObj = new Location(docSnap.data().name, docSnap.data().desc,
              docSnap.data().yearString, docSnap.data().coords,
              docSnap.data().position)
          let imgRef = docSnap.data().imgRef
          let storage = firebase.storage()
          let images = docSnap.data().images
          let imArray = []
          if(images){
            images.forEach(function(image){
              let storageRef = storage.ref(`${STORAGE_LOCATION_PREFIX}/${imgRef}/${image.filename}`)
              storageRef.getDownloadURL().then(function(url){
                let imageData = new ImageData(url, image.desc, image.date.toDate())
                imArray.push(imageData)
                if(imArray.length === images.length){
                  imArray.sort(function(a, b){
                    if(a.date < b.date){
                      return -1;
                    }
                    else if(a.date > b.date){
                      return 1;
                    }
                    return 0;
                  })
                  resolve(new LocationDataNode(locationObj, imArray))
                }
              })
            })
          }
          else{
            resolve(new LocationDataNode(locationObj, imArray))
          }
        })
        promise.then(function(node){
          locationNodes.push(node)
          if(locationNodes.length === querySnap.docs.length){
            linkNodes(locationNodes)
            dispatch(populateLocations(locationNodes))
          }
        })
      })
    })
  }
}
