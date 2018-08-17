import React from 'react'
import '../../styles/LocationPage.css'
import SectionTitle from '../SectionTitle'
import LocationMapContainer from '../../containers/LocationMapContainer'
import LocationLookupContainer from './containers/LocationLookupContainer'
import LocationSwitchContainer from './containers/LocationSwitchContainer'
import PhotoGrid from '../PhotoGrid'
import {FADE_IN_TIMEOUT, VIEWS} from '../../constants'
import Fade from '@material-ui/core/Fade'

class LocationPage extends React.Component {
  renderMap(){
    if(this.props.locationNodes){
      if(this.props.activeView === VIEWS["MOBILE"] || this.props.activeView === VIEWS["TABLET"]){
        return <LocationMapContainer locations={this.props.locationNodes} width='90vw' style={{top: '50%', position: 'relative'}}/>
      }
      return <LocationMapContainer locations={this.props.locationNodes} width='55vw' style={{position: 'absolute', right: '3vw'}}/>
    }
    return null
  }

  renderPhotoGrid(){
    if(this.props.currLocationNode && this.props.currLocationNode.imgData.length > 0){
      return <PhotoGrid rowHeight={'150px'} images={this.props.currLocationNode.imgData} style={{marginTop: '15vh', paddingBottom: '16px', width: '90vw'}}/>
    }
    else{
      return <div style={{marginTop: '15vh', height: '150px', width: '90vw'}}></div>
    }
  }

  render(){
    return (
      <Fade in timeout={FADE_IN_TIMEOUT}>
        <div className='page-section find-me-here'>
          <div className = 'left'>
            <SectionTitle text={['find me', 'here.']}/>
            <LocationLookupContainer style={{marginTop: '7vh'}}/>
            <LocationSwitchContainer style={{position: 'relative', height: '60px'}}/>
            {this.renderMap()}
            {this.renderPhotoGrid()}
          </div>
        </div>
      </Fade>
    )
  }
}

export default LocationPage
