import React from 'react'
import Image from '../components/Image'
import Overlay from '../components/Image/components/Overlay'
import withCoverTransition from '../components/Transitions/withCoverTransition'
import withHover from '../components/Transitions/withHover'
import withModal from '../components/Transitions/withModal'

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
      else if(key === withHover){
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
    let abilityMap = new Map([[withCoverTransition, true], [withHover, false], [withModal, true]])
    if(imageData.desc && imageData.date){
      abilityMap.set(withHover, true)
    }
    let ImageComponent = composeImage(imageData, abilityMap)
    return <ImageComponent src={imageElement} date={imageData.date} desc={imageData.desc} style={style} alt={'image'}/>
  }
  return null
}

function createImage(src){
  let img = document.createElement('img')
  img.src = src
  return img
}

export function linkString(str){
  if(!str){
    return
  }
  return str.replace(/ /g, "%20")
}
