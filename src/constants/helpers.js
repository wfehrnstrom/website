import React from 'react'
import Image from '../components/Image'
import Overlay from '../components/Image/components/Overlay'
import withCoverTransition from '../components/Transitions/withCoverTransition'
import withHover from '../components/Transitions/withHover'
import withModal from '../components/Transitions/withModal'
import withLazyLoad from '../components/Transitions/withLazyLoad'

export function approximatelyEqual(a, b, diff=0.001){
  return (Math.abs(a - b) < diff)
}

export function getDisplayName(Component){
  return Component.displayName || Component.name || 'Component'
}

export function composeImage(imageData, abilities){
  let image = Image
  abilities.forEach((value, key, permissionMap) => {
    // if the HOC is permitted for this component instance, apply it
    if(permissionMap.get(key)){
      // if we're dealing with a modal, we need to pass a plain image as the thing
      // to render inside the modal
      if(key === withModal){
        image = key(image, Image)
      }
      else if(key === withHover && imageData){
        let Info = (<Overlay key={imageData.date} desc={imageData.desc} date={imageData.date}/>)
        image = key(image, Info)
      }
      else{
        image = key(image)
      }
    }
  })
  return image
}

export function renderImage(imageData, style=null){
  if(imageData && imageData.src){
    let imageElement = createImage(imageData.src)
    let abilityMap = createAbilityMap()
    if(imageData.desc && imageData.date){
      abilityMap.set(withHover, true)
    }
    let ImageComponent = composeImage(imageData, abilityMap)
    return <ImageComponent src={imageElement} date={imageData.date} desc={imageData.desc} style={style} alt={'image'}/>
  }
  return null
}

export function renderImageFromSrcPath(src, style=null, props=null){
  let abilityMap = createAbilityMap()
  let ImageComponent = composeImage(null, abilityMap)
  return <ImageComponent src={src} style={style} alt={'image'} {...props}/>
}

export function createAbilityMap(){
  return new Map([[withCoverTransition, true], [withHover, false], [withModal, false], [withLazyLoad, true]])
}

export function createImage(src){
  let img = document.createElement('img')
  img.src = src
  return img
}

export function elementGetOffsetFromParent(element, parent){
  let currEl = element
  let offset =  0
  while(currEl !== parent){
    offset += currEl.offsetTop
    currEl = currEl.offsetParent
  }
  return offset
}

export function toLinkString(str, replacementStr = ""){
  if(!str){
    return
  }
  return replaceSpacesInStrWith(str, replacementStr).toLowerCase()
}

function replaceSpacesInStrWith(str, replacement){
  return str.replace(/ /g, replacement)
}

export function loadJSONFile(json, functionToRunOnDataCreation = defaultDataCreationFunc, keyAttr = null){
  let JSONArr = JSON.parse(JSON.stringify(json))
  return populateJSONDataMap(JSONArr, keyAttr, functionToRunOnDataCreation)
}

function populateJSONDataMap(jsonArr, keyAttr, functionToRunOnDataCreation){
  let dataMap = new Map([])
  if(!jsonArr || jsonArr.length < 1){
    return dataMap
  }
  keyAttr = (jsonArr[0][keyAttr] ? keyAttr : Object.keys(jsonArr[0])[0])
  jsonArr.forEach(function(jsonObject){
    dataMap.set(jsonObject[keyAttr], functionToRunOnDataCreation(jsonObject))
  })
  return dataMap
}

function defaultDataCreationFunc(jsonObject){
  let obj = new Object({...jsonObject})
  return obj
}

const LOAD_PATH = '/images/'
export function getImgLoadPath(imagename, lookIn = ''){
  return process.env.PUBLIC_URL + LOAD_PATH + lookIn + imagename
}
