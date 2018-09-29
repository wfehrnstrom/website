import React from 'react'
import PageTitle from '../../PageTitle'
import Fade from '@material-ui/core/Fade'
import HomeLink from '../../HomeLink'
import {STATUS} from '../../../constants'
import '../../../styles/DefaultProjectPage.css'
import github from '../../../res/img/logos/github.png'

class DefaultProjectPage extends React.Component {
  constructor(props){
    super(props)
    this.STATUS_MAPPING = new Map([[STATUS["COMPLETED"], {tag: "COMPLETED", tagColor: "#06C806"}], [STATUS["ACTIVE"], {tag: "ACTIVE", tagColor: "#4BB2FD"}], [STATUS["TERMINATED"], {tag: "TERMINATED", tagColor: "#EF1010"}]])
  }

  renderStatus(){
    let status = this.STATUS_MAPPING.get(this.props.project.status).tag
    let statusColor = this.STATUS_MAPPING.get(this.props.project.status).tagColor
    return (
      <div className='header-link project-status'>
        <div className='sublabel'>Status</div>
        <div className='status label' style={{marginTop: '10px', backgroundColor: statusColor, padding: '5px', borderRadius: '2px'}}>{status}</div>
      </div>
    )
  }

  renderDates(){
    return (
      <div className='header-link project-dates'>
        <div className='sublabel'>Start</div>
        <div className='label' style={{marginTop: '10px'}}>{this.props.project.createdOn.toDateString()}</div>
      </div>
    )
  }

  renderLinks(){
    return (
      <div className='header-link project-links'>
        {this.mapLinksToImages()}
      </div>
    )
  }

  mapLinksToImages(){
    return this.props.project.urls.map((url) => {
      let image = this.selectImageBasedOnURL(url)
      return (<a className='project-link' key={url} href={url}><img src={image} alt={url}/></a>)
    })
  }

  selectImageBasedOnURL(url){
    if(url.toLowerCase().indexOf("github") !== -1){
      return github
    }
    return ""
  }

  render(){
    return (
      <div className='page-root'>
        <div className='project-title-bar'>
          <Fade in timeout={400}>
            <PageTitle className='page-title' text={[this.props.project.title, '']}/>
          </Fade>
          <HomeLink/>
          {this.props.project && this.renderProjectContents()}
        </div>
      </div>
    )
  }

  renderProjectContents(){
    return (
      <div className='project-contents'>
        {this.renderProjectHeader()}
        {this.renderProjectSummary()}
      </div>
    )
  }

  renderProjectHeader(){
    return (
      <div className='project-header-links main-section'>
        {this.props.project.status !== null && this.renderStatus()}
        {this.props.project.createdOn && this.renderDates()}
        {this.props.project.urls && this.renderLinks()}
      </div>
    )
  }

  renderProjectSummary(){
    return (
      <div className='project-summary main-section'>
        <div className='superlabel' style={{marginBottom: '10px'}}>Project Summary</div>
        <div className='project-summary-text'>
          I began this project while staying on Cold Stream Pond in Maine. I've tried my
          hand before at creating websites, but all of the previous attempts were decidedly
          old school, primarily featuring a stack of HTML/CSS and vanilla JS, as well as a
          dash of JQuery to animate things around.  Given that web technology has changed a
          lot, I decided to give it another go.  The website you are on right now is the direct
          result of that attempt. I used Figma to mock up all my static designs for the website,
          from my logo to entire pages. I use React.JS as a frontend framework primarily because
          I like React's design philosophy and it tends to scale quite well, saving me a good
          amount of work.  One thing I would love to revamp on this website is the way I currently
          handle CSS. I work with plain old CSS to design everything to my specifications, but it
          would perhaps be aided by using SCSS instead. I'm also using Redux to store a lot of my
          application state, and firebase to remotely store some data.  I'm hosting the website through
          netlify, enabling simple website deployments through the master branch of my git repository.
        </div>
      </div>
    )
  }
}

export default DefaultProjectPage
