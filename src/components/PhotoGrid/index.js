import React from 'react'
import '../../styles/PhotoGrid.css'
import Image from '../Image'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {IMG_COUNTS, VIEWS} from '../../constants'
import memoize from 'memoize-one'


/**
 * PhotoGrid
 * @extends React
 * @prop images - an array of ImageData objects
 * @prop style - css styling for the grid's container
 */
class PhotoGrid extends React.Component {

  constructor(props){
    super(props)
    this.map = new Map([[VIEWS["DESKTOP"], IMG_COUNTS["DESKTOP"]], [VIEWS["TABLET"], IMG_COUNTS["TABLET"]], [VIEWS["MOBILE"], IMG_COUNTS["MOBILE"]]])
    let rowHeight = this.props.rowHeight ? this.props.rowHeight : '30vh'
    this.state = {
      rowHeight: rowHeight,
      shouldAnimate: true,
      prevImages: null,
    }
  }

  static getDerivedStateFromProps(props, state){
    // initial render
    if(props.images !== state.prevImages){
      return {
        shouldAnimate: true,
        prevImages: props.images,
      }
    }
    else if(props.images === state.prevImages){
      return {
        shouldAnimate: false
      }
    }
  }

  rowCalc = memoize((activeView, numImages) => {
    let numRows = 1
    if(this.map.get(activeView)){
      numRows = Math.ceil(numImages / (12 / this.map.get(activeView)))
    }
    return numRows
  })

  numPhotosInRow = memoize((activeView) => (this.map.get(activeView) ? (12 / this.map.get(activeView)) : 2))

  renderRow(photoNum){
    let row = []
    let lastIndex
    let numPhotosInRow = this.numPhotosInRow(this.props.activeView)
    if((photoNum + numPhotosInRow) < this.props.images.length){
      lastIndex = photoNum + numPhotosInRow
    }
    else{
      lastIndex = this.props.images.length
    }
    for(let photoIndex = photoNum; photoIndex < lastIndex; photoIndex++){
      let image = this.props.images[photoIndex]
      let imgComponent = <Image animatable={this.state.shouldAnimate} hoverable={true} src={image.src} desc={image.desc} date={image.date} style={{width: '100%', height: '100%'}}/>
      row.push(
        <Col key = {photoIndex} xs={IMG_COUNTS["MOBILE"]} sm={IMG_COUNTS["TABLET"]} md={IMG_COUNTS["TABLET"]} lg={IMG_COUNTS["DESKTOP"]} xl={IMG_COUNTS["DESKTOP"]}>
          {imgComponent}
        </Col>
      )
    }
    return row
  }

  renderRows(){
    let toRender = []
    let numRows = this.rowCalc(this.props.activeView, this.props.images.length)
    for(let rowIndex = 0; rowIndex < numRows; rowIndex++){
      let row = (
        <Row key={`r${rowIndex}`} className = 'row' style={{height: this.state.rowHeight}}>
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

export default PhotoGrid
