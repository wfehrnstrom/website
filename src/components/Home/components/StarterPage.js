import React from 'react'
import whiteLogo from '../../../res/vector/white_logo.svg'
import blackLogo from '../../../res/vector/will_fehrnstrom@1.5x.svg'
import homeVid from '../../../res/img/me.mp4'
import logoVid from '../../../res/img/logo.mp4'
import usaFlag from '../../../res/img/american_flag_small.jpg'
import me from '../../../res/img/me_author.png'
import '../../../styles/homepage.css'
import Button from '../../Button'
import Navbar from '../../Navbar'
import Video from './Video'
import viewAware from '../../../containers/viewAware'

class StarterPageViewUnaware extends React.Component {

  renderVideo(){
    return <Video className='person-vid' parallax sources={[homeVid]} poster={me}/>
  }

  triggerTransition(){
    let about_me = document.querySelectorAll('.pages .page-section')[0] || document.querySelectorAll('.pages .page-section-spacer')[0]
    about_me.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
  }

  renderCallToAction(){
    return (
      <div className="homepage-left" style={{position: 'relative', bottom: '14vh', height: '50vh'}}>
        <div className="explore" style={{height: '100%', position: 'relative', top: '40px'}}>
          <Video style={{objectFit: 'contain'}} containerStyle={{marginBottom: '50px'}} sources={[logoVid]} poster={blackLogo} />
          <Button style={{position: 'relative', bottom: '30px'}} text="Start" type="contained" color="primary" onClick={this.triggerTransition}/>
        </div>
      </div>
    )
  }

  renderPortrait(){
    return (
      <div className="homepage-right">
        <div className="homepage-right-content">
          <div className='explore-wrapper' style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))'}}>
            <div className='explore'>
              <img className='logo-right' alt={'Will.Fehrnstrom'} src={whiteLogo}/>
              <Button className='begin-button' style={{marginTop: '20px'}} text="Start" type="contained" color="primary" onClick={this.triggerTransition}/>
            </div>
          </div>
          {this.renderVideo()}
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="page-wrapper">
        {/* {TODO: Change Navbar to accept elements instead that automatically distribute themselves well} */}
        <Navbar className = "home-nav" elements={["Blog", "Media", "Projects"]} padding={[['20px', '5vw', '20px', '5vw'],['4vh', 0, '10vh', '10vw']]}
          margin={[[0, 0, 0, 0],[0, 0, 0, 0]]} textColor={['black', 'white']} style={{zIndex: 5}}/>
        <div className="content-wrapper">
          {this.renderCallToAction()}
          {this.renderPortrait()}
        </div>
        <div className= 'demo-disclaimer'>ALPHA, v0.4</div>
        <div className= 'usa-flag'><img src={usaFlag} alt={'US Flag'}/></div>
      </div>
    )
  }
}

const StarterPage = viewAware(StarterPageViewUnaware)

export default StarterPage
