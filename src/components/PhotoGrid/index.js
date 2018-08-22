import React from 'react'
import '../../styles/PhotoGrid.css'
import '../../styles/image.css'
import Image from '../Image'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {IMG_COUNTS, VIEWS} from '../../constants'
import memoize from 'memoize-one'
import viewAware from '../../containers/viewAware'
import withCoverTransition from '../Transitions/withCoverTransition'
import withModal from '../Transitions/withModal'
import withHover from '../Transitions/withHover'

/**
 * PhotoGrid
 * @extends React
 * @prop images - an array of ImageData objects
 * @prop style - css styling for the grid's container
 */
class PhotoGridViewUnaware extends React.Component {

  constructor(props){
    super(props)
    this.viewMap = new Map([[VIEWS["DESKTOP"], IMG_COUNTS["DESKTOP"]], [VIEWS["TABLET"], IMG_COUNTS["TABLET"]], [VIEWS["MOBILE"], IMG_COUNTS["MOBILE"]]])
    let rowHeight = this.props.rowHeight ? this.props.rowHeight : '30vh'
    this.state = {
      rowHeight: rowHeight,
      imageDecorationMap: this.updateImageDecorationMap(this.props.images),
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.images !== this.props.images){
      this.setState({imageDecorationMap: new Map(this.updateImageDecorationMap(nextProps.images))})
    }
  }

  updateImageDecorationMap(images){
    let imageDecorationMap = (this.state && this.state.imageDecorationMap ? this.state.imageDecorationMap : new Map([]))
    images.forEach((image) => {
      if(!imageDecorationMap.get(image)){
        imageDecorationMap.set(image, new Map([[withCoverTransition, true], [withHover, true], [withModal, true]]))
      }
    })
    return imageDecorationMap
  }

  generateComponent(imageData, template=null){
    if(template){
      return this.composeImage(imageData, template)
    }
    else{
      return this.composeImage(imageData, new Map([[withCoverTransition, true], [withHover, true], [withModal, true]]))
    }
  }

  composeImage(imageData, abilities){
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
          let desc = <div className='text desc'>{imageData.desc}</div>
          let date = <div className='text date'>{imageData.date.getFullYear()}</div>
          let Info = (props) => {
            return (
              <div style={{width: '100%', height: '100%', position: 'relative'}}>
                {imageData.desc && imageData.date && [desc, date]}
              </div>
            )
          }
          image = key(image, Info)
        }
        else{
          image = key(image)
        }
      }
    })
    return image
  }

  handleImageError(imageID){
    if(this.state.imageDecorationMap){
      let imageDecorationMap = this.state.imageDecorationMap.set(imageID, new Map([[withCoverTransition, false], [withHover, false], [withModal, false]]))
      this.setState({imageDecorationMap: new Map(imageDecorationMap)})
    }
  }

  numRows = memoize((activeView, numImages) => {
    let numRows = 1
    if(this.viewMap.get(activeView)){
      numRows = Math.ceil(numImages / (12 / this.viewMap.get(activeView)))
    }
    return numRows
  })

  numPhotosInRow = memoize((activeView) => (this.viewMap.get(activeView) ? (12 / this.viewMap.get(activeView)) : 2))

  getImageComponentMap = memoize((imageDecorationMap) => {
    let componentMapping = new Map([])
    imageDecorationMap.forEach((decoration, imageData) => {
      componentMapping.set(imageData, this.generateComponent(imageData, decoration))
    })
    return componentMapping
  })

  getIndexOfLastPhotoInRow(indexOfFirstPhotoInRow){
    let indexOfLastPhotoInRow
    let numPhotosInRow = this.numPhotosInRow(this.props.activeView)
    if((indexOfFirstPhotoInRow + numPhotosInRow) < this.props.images.length){
      indexOfLastPhotoInRow = indexOfFirstPhotoInRow + numPhotosInRow - 1
    }
    else{
      indexOfLastPhotoInRow = this.props.images.length - 1
    }
    return indexOfLastPhotoInRow
  }

  renderRow(photoNum){
    let imageComponentMap = this.getImageComponentMap(this.state.imageDecorationMap)
    let indexOfLastPhotoInRow = this.getIndexOfLastPhotoInRow(photoNum)
    let row = []
    for(let photoIndex = photoNum; photoIndex <= indexOfLastPhotoInRow; photoIndex++){
      let image = this.props.images[photoIndex]
      let errHandle = this.handleImageError.bind(this, image)
      let ImageComponent = imageComponentMap.get(image)
      row.push(
        <Col key = {photoIndex} xs={IMG_COUNTS["MOBILE"]} sm={IMG_COUNTS["TABLET"]} md={IMG_COUNTS["TABLET"]} lg={IMG_COUNTS["DESKTOP"]} xl={IMG_COUNTS["DESKTOP"]}>
          {ImageComponent && <ImageComponent src={image.src} desc={image.desc} date={image.date} handleError={errHandle}/>}
        </Col>
      )
    }
    return row
  }

  renderRows(){
    let toRender = []
    let numRows = this.numRows(this.props.activeView, this.props.images.length)
    for(let rowIndex = 0; rowIndex < numRows; rowIndex++){
      let row = (
        <Row key={`r${rowIndex}`} style={{height: this.state.rowHeight}}>
          {this.renderRow(rowIndex * this.numPhotosInRow(this.props.activeView))}
        </Row>
      )
      toRender.push(row)
    }
    return toRender
  }

  render(){
    return (
      <div className='grid-container' style={this.props.style}>
        <Grid className = 'grid' fluid>
          {this.renderRows()}
        </Grid>
      </div>
    )
  }
}

const PhotoGrid = viewAware(PhotoGridViewUnaware)

export default PhotoGrid
