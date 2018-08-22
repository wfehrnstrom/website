import * as json from '../res/data/images.json'
import ImageData from '../constants/ImageData'

export const LOAD_PHOTOS_FROM_DATA = 'LOAD_PHOTOS_FROM_DATA'
export function loadPhotosFromData(images){
  return {type: LOAD_PHOTOS_FROM_DATA, images: images}
}

function jsonImgToImgData(loadPath, jsonImg){
  let fullFilePath = loadPath + jsonImg.filename
  let imgEl = new Image()
  imgEl.src = fullFilePath
  return new ImageData(imgEl, jsonImg.desc, new Date(jsonImg.date))
}

export function getPhotos(){
  return (dispatch) => {
    let imgArr = JSON.parse(JSON.stringify(json))
    const loadPath = '../img/'
    console.log(imgArr)
    let imgDataToSend = imgArr.map((imgObject) => {
      return jsonImgToImgData(loadPath, imgObject)
    })
    dispatch(loadPhotosFromData(imgDataToSend))
  }
}
