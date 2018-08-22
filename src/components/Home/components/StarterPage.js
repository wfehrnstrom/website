import React from 'react'
import '../../../styles/homepage.css'
import whiteLogo from '../../../res/vector/white_logo.svg'
import homeVid from '../../../res/img/person_flickering.mp4'
import logoVid from '../../../res/img/logo.mp4'
import Button from '../../Button'
import Navbar from '../../Navbar'
import Video from './Video'
import { VIEWS } from '../../../constants'
import viewAware from '../../../containers/viewAware'
import withCoverTransition from '../../Transitions/withCoverTransition'

class StarterPageViewUnaware extends React.Component {

  renderVideo(){
    if(this.props.activeView === VIEWS["DESKTOP"]){
      return <Video parallax style={{left: '60vw', top: '20vh', width: '30vw', height: '50vh'}} sources={[homeVid]}/>
    }
    else if(this.props.activeView === VIEWS["TABLET"]){
      return <Video parallax style={{left: 0, top: 0, width: '100vw', height: '100vh'}} sources={[homeVid]}/>
    }
    else if(this.props.activeView === VIEWS["MOBILE"]){
      return <Video parallax style={{left: 0, top: 0, width: '100vw', height: '100vh'}}  sources={[homeVid]}/>
    }
    else{
      return null
    }
  }

  triggerTransition(){
    let find_me_here = document.querySelectorAll('.pages .page-section .section-title')[0] || document.querySelectorAll('.pages .page-section-spacer')[0]
    find_me_here.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
  }

  render(){
    return (
      <div className="page-wrapper">
        <Navbar className = "home-nav" elements={["Blog", "Media", "Projects"]} padding={[['20px', '5vw', '20px', '5vw'],['10vh', 0, '10vh', '10vw']]}
          margin={[[0, 0, 0, 0],[0, 0, 0, 0]]} textColor={['black', 'white']} style={{zIndex: 5}}/>
        <div className="content-wrapper">
          <div className="homepage-left" style={{position: 'relative', bottom: '7vh', height: '50vh'}}>
            <div className="explore" style={{height: '100%'}}>
              <Video style={{objectFit: 'contain'}} sources={[logoVid]}/>
              <Button style={{position: 'relative', bottom: '30px'}} text="Start" type="contained" color="primary" onClick={this.triggerTransition}/>
            </div>
          </div>
          <div className="homepage-right">
            <div className="homepage-right-content">
              <div className='explore'>
                <img className='logo-right' src={whiteLogo}/>
                <Button className='begin-button' style={{marginTop: '20px'}} text="Start" type="contained" color="primary" onClick={this.triggerTransition}/>
              </div>
              {this.renderVideo()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const StarterPage = viewAware(StarterPageViewUnaware)

export default StarterPage
