import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {IMG_COUNTS, VIEWS} from '../../constants'
import {composeImage, createAbilityMap} from '../../constants/helpers'
import memoize from 'memoize-one'
import viewAware from '../../containers/viewAware'
import withCoverTransition from '../Transitions/withCoverTransition'
import withModal from '../Transitions/withModal'
import withHover from '../Transitions/withHover'
import withLazyLoad from '../Transitions/withLazyLoad'
import '../../styles/PhotoGrid.css'
import '../../styles/image.css'

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
    if(images){
      images.forEach((image) => {
        if(!imageDecorationMap.get(image)){
          imageDecorationMap.set(image, this.getDecorations())
        }
      })
    }
    return imageDecorationMap
  }

  getDecorations(){
    if(this.props.static){
      return new Map([[withCoverTransition, false], [withHover, false], [withModal, false], [withLazyLoad, false]])
    }
    return this.getDecorationsFromProps()
  }

  getDecorationsFromProps(){
    let shouldCover = true
    let shouldHover = true
    let shouldModal = true
    if(this.props.noCover){
      shouldCover = false
    }
    if(this.props.noHover){
      shouldHover = false
    }
    if(this.props.noModal || this.props.links){
      shouldModal = false
    }
    return new Map([[withCoverTransition, shouldCover], [withHover, shouldHover], [withModal, shouldModal], [withLazyLoad, false]])
  }

  generateComponent(imageData, template=null){
    if(template){
      return composeImage(imageData, template)
    }
    else{
      return composeImage(imageData, createAbilityMap())
    }
  }

  handleImageError(imageID){
    if(this.state.imageDecorationMap){
      let imageDecorationMap = this.state.imageDecorationMap.set(imageID, new Map([[withLazyLoad, false], [withCoverTransition, false], [withHover, false], [withModal, false]]))
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
      row.push(
        <Col key = {photoIndex} xs={IMG_COUNTS["MOBILE"]} sm={IMG_COUNTS["TABLET"]} md={IMG_COUNTS["TABLET"]} lg={IMG_COUNTS["DESKTOP"]} xl={IMG_COUNTS["DESKTOP"]}>
          {this.renderImage(image, imageComponentMap)}
        </Col>
      )
    }
    return row
  }

  renderImage(image, imageComponentMap){
    let errHandle = this.handleImageError.bind(this, image)
    let ImageComponent = imageComponentMap.get(image)
    if(this.hasLink(image)){
      return this.getLinkedImage(image, ImageComponent, errHandle)
    }
    return this.getUnlinkedImage(image, ImageComponent, errHandle)
  }

  getLinkedImage(image, ImageComponent, errHandle){
    return (<Link to={this.props.links.get(image)}>{this.getUnlinkedImage(image, ImageComponent, errHandle)}</Link>)
  }

  getUnlinkedImage(image, ImageComponent, errHandle){
    return <ImageComponent src={image.src} desc={image.desc} date={image.date} handleError={errHandle}/>
  }

  hasLink(image){
    return this.props.links && this.props.links.get(image)
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
        {this.renderPhotosIfTheyExist()}
      </div>
    )
  }

  renderPhotosIfTheyExist(){
    if(this.props.images && this.props.images.length > 0){
      return (
        <Grid className = 'grid' fluid>
          {this.renderRows()}
        </Grid>
      )
    }
    return (
      <div style={{marginTop: '10vh', fontWeight: '100', fontSize: '1rem'}}>
        <strong>LOOK! It's a squirrel!</strong> Will, hide the photos while they're distracted!
      </div>
    )
  }
}

const PhotoGrid = viewAware(PhotoGridViewUnaware)

export default PhotoGrid
