import * as json from '../res/data/images.json'
import ImageData from '../constants/ImageData'

export const LOAD_PHOTOS_FROM_DATA = 'LOAD_PHOTOS_FROM_DATA'
export function loadPhotosFromData(images){
  return {type: LOAD_PHOTOS_FROM_DATA, images: images}
}

function jsonImgToImgData(loadPath, jsonImg){
  return new ImageData(loadPath + jsonImg.filename, jsonImg.desc, new Date(jsonImg.date))
}

export function getPhotos(){
  return (dispatch) => {
    let imgArr = JSON.parse(JSON.stringify(json))
    const loadPath = process.env.PUBLIC_URL + '/images/'
    let imgDataToSend = imgArr.map((imgObject) => {
      return jsonImgToImgData(loadPath, imgObject)
    })
    dispatch(loadPhotosFromData(imgDataToSend))
  }
}
